/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import { AdminShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { ShowableAtRender } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import NotificationListComponent from '../../../components/user/notification/NotificationListComponent'
import {
  notificationPollerActions,
  notificationPollerInstanceActions,
  notificationInstanceActions,
  notificationActions,
  notificationPollerSelectors,
  notificationSelectors,
  deleteNotificationActions,
  deleteNotificationInstanceActions,
  notificationDetailsInstanceActions,
  notificationDetailsActions,
} from '../../../clients/NotificationClient'
import {
  readNotificationActions,
  readNotificationInstanceActions,
} from '../../../clients/ReadNotificationClient'
import { tableActions } from '../../../clients/TableClient'
import { NotificationFilters } from '../../../domain/filters'
import { STATUS_ENUM } from '../../../domain/statusEnum'
import { LEVELS_ENUM } from '../../../domain/levelsEnum'

/**
 * Notification list container, shows the number of unread notifications.
 * @author Maxime Bouveron
 * @author Théo Lasserre
 */
export class NotificationListContainer extends React.Component {
  static requiredDependencies = [
    notificationPollerActions.getDependency(RequestVerbEnum.GET_LIST),
  ]

  static mapStateToProps(state) {
    return {
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      sessionLocked: AuthenticationClient.authenticationSelectors.isSessionLocked(state),
      lastNotification: notificationPollerSelectors.getList(state),
      nbNotificationUnreadAndError: notificationPollerSelectors.getResultsCount(state),
      isLoading: notificationSelectors.isFetching(state),
    }
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static mapDispatchToProps(dispatch) {
    const statusUnReadErrorParam = new NotificationFilters().withStatusIncluded(STATUS_ENUM.UNREAD).withLevelsIncluded([LEVELS_ENUM.ERROR, LEVELS_ENUM.FATAL]).build()
    return {
      fetchLastNotification: (instance = false) => dispatch(
        instance
          ? notificationPollerInstanceActions.fetchPagedEntityListByPost(0, 1, {}, {}, statusUnReadErrorParam)
          : notificationPollerActions.fetchPagedEntityListByPost(0, 1, {}, {}, statusUnReadErrorParam),
      ),
      fetchNotification: (notificationId, instance = false) => dispatch(
        instance
          ? notificationDetailsInstanceActions.fetchNotification(notificationId)
          : notificationDetailsActions.fetchNotification(notificationId),
      ),
      sendReadNotification: (notificationId, instance = false) => dispatch(
        instance
          ? readNotificationInstanceActions.readNotification(notificationId)
          : readNotificationActions.readNotification(notificationId),
      ),
      deleteNotifications: (bodyParameters, instance = false) => dispatch(
        instance
          ? deleteNotificationInstanceActions.deleteNotifications(bodyParameters)
          : deleteNotificationActions.deleteNotifications(bodyParameters),
      ),
      dispatchUnselectAll: () => dispatch(tableActions.unselectAll()),
    }
  }

  static propTypes = {
    project: PropTypes.string,
    // from mapStateToProps
    lastNotification: AdminShapes.NotificationList, // THIS IS A LIST WITH ONE ITEM INSIDE
    sessionLocked: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    nbNotificationUnreadAndError: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchLastNotification: PropTypes.func.isRequired,
    sendReadNotification: PropTypes.func.isRequired,
    fetchNotification: PropTypes.func.isRequired,
    deleteNotifications: PropTypes.func.isRequired,
    dispatchUnselectAll: PropTypes.func.isRequired,
  }

  static getNotif(notification) {
    const valuesArray = notification ? values(notification) : []
    return valuesArray.length ? valuesArray[0] : null
  }

  state = {
    isInstance: !this.props.project,
  }

  UNSAFE_componentWillMount() {
    this.startTimer()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!!this.notify && !isEqual(this.props.lastNotification, nextProps.lastNotification)) {
      // Open a popup if there is a new notif
      const lastNotif = NotificationListContainer.getNotif(nextProps.lastNotification)
      const previousLastNotif = NotificationListContainer.getNotif(this.props.lastNotification)

      // notify only when not already read and MORE recent notification (ie: that notification popped during last pull)
      if (lastNotif && lastNotif.content.status === STATUS_ENUM.UNREAD
        && new Date(get(lastNotif, 'content.date', 0)).getTime() > new Date(get(previousLastNotif, 'content.date', 0))) {
        this.notify(lastNotif.content)
      }
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    const { sessionLocked, isAuthenticated } = this.props
    if (isAuthenticated && !sessionLocked) {
      // A - refresh list only if authenticated
      this.props.fetchLastNotification(this.state.isInstance)
    }
    // B - restart timer
    this.refreshTimer = setTimeout(() => this.startTimer(), STATIC_CONF.POLLING_TIMER_NOTIFICATIONS)
  }

  stopTimer = () => {
    clearTimeout(this.refreshTimer)
  }

  restartTimer = () => {
    this.stopTimer()
    this.startTimer()
  }

  readNotification = (notification, onRefresh) => {
    const promises = []
    const notificationStatus = get(notification, 'status')
    if (notificationStatus === STATUS_ENUM.UNREAD) {
      promises.push(this.props.sendReadNotification(notification.id, this.state.isInstance))
    }
    promises.push(this.props.fetchNotification(notification.id, this.state.isInstance))
    this.restartTimer()
    this.perform(promises, onRefresh)
  }

  deleteNotifications = (inputFilters, onRefresh) => {
    const { deleteNotifications, dispatchUnselectAll } = this.props
    const requestParameters = UIDomain.FiltersPaneHelper.buildRequestParameters(inputFilters)
    this.restartTimer()
    this.perform(deleteNotifications(requestParameters, this.state.isInstance), onRefresh)
    dispatchUnselectAll()
  }

  registerNotify = (notify) => {
    this.notify = notify
  }

  perform = (promise, onRefresh) => {
    Promise.resolve(promise).then(() => Promise.resolve(
      onRefresh(true),
    ))
  }

  render() {
    const { isInstance } = this.state
    return (
      <ShowableAtRender show={this.props.isAuthenticated}>
        <NotificationListComponent
          readNotification={this.readNotification}
          deleteNotifications={this.deleteNotifications}
          registerNotify={this.registerNotify}
          notificationActions={isInstance ? notificationInstanceActions : notificationActions}
          notificationSelectors={notificationSelectors}
          nbNotificationUnreadAndError={this.props.nbNotificationUnreadAndError}
          isInstance={this.state.isInstance}
          isLoading={this.props.isLoading}
        />
      </ShowableAtRender>
    )
  }
}

export default connect(NotificationListContainer.mapStateToProps, NotificationListContainer.mapDispatchToProps)(NotificationListContainer)
