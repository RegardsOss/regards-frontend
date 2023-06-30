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
import { AdminShapes, CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { ShowableAtRender } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import NotificationListComponent from '../../../components/user/notification/NotificationListComponent'
import {
  notificationPollerActions,
  notificationPollerInstanceActions,
  notificationInstanceActions,
  notificationActions,
  notificationPollerSelectors,
  notificationSelectors,
  notificationReadPollerActions,
  notificationReadPollerInstanceActions,
  notificationReadPollerSelectors,
  deleteNotificationActions,
  deleteNotificationInstanceActions,
} from '../../../clients/NotificationClient'
import {
  readNotificationActions,
  readNotificationInstanceActions,
} from '../../../clients/ReadNotificationClient'

/**
 * Notification list container, shows the number of unread notifications.
 * @author Maxime Bouveron
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
      nbNotification: notificationPollerSelectors.getResultsCount(state),
      lastReadNotification: notificationReadPollerSelectors.getList(state),
      nbReadNotification: notificationReadPollerSelectors.getResultsCount(state),
      notificationMetadata: notificationSelectors.getMetaData(state),
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      fetchLastNotification: (instance = false) => dispatch(
        instance
          ? notificationPollerInstanceActions.fetchPagedEntityList(0, 1, {}, { state: 'UNREAD' })
          : notificationPollerActions.fetchPagedEntityList(0, 1, {}, { state: 'UNREAD' }),
      ),
      fetchLastReadNotification: (instance = false) => dispatch(
        instance
          ? notificationReadPollerInstanceActions.fetchPagedEntityList(0, 1, {}, { state: 'READ' })
          : notificationReadPollerActions.fetchPagedEntityList(0, 1, {}, { state: 'READ' }),
      ),
      fetchNotification: (isInstance, pageNumber, fetchPageSize, requestParam) => dispatch(
        isInstance
          ? notificationInstanceActions.fetchPagedEntityList(0, fetchPageSize, {}, requestParam)
          : notificationActions.fetchPagedEntityList(pageNumber, fetchPageSize, {}, requestParam),
      ),
      sendReadNotification: (notificationId, instance = false) => dispatch(
        instance
          ? readNotificationInstanceActions.readNotification(notificationId)
          : readNotificationActions.readNotification(notificationId),
      ),
      markAllNotificationRead: (instance = false) => dispatch(
        instance
          ? readNotificationInstanceActions.markAllNotificationRead()
          : readNotificationActions.markAllNotificationRead(),
      ),
      deleteReadNotifications: (instance = false) => dispatch(
        instance
          ? deleteNotificationInstanceActions.sendSignal('DELETE')
          : deleteNotificationActions.sendSignal('DELETE'),
      ),
    }
  }

  static propTypes = {
    project: PropTypes.string,
    // from mapStateToProps
    lastNotification: AdminShapes.NotificationList, // THIS IS A LIST WITH ONE ITEM INSIDE
    lastReadNotification: AdminShapes.NotificationList, // THIS IS A LIST WITH ONE ITEM INSIDE
    sessionLocked: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    nbNotification: PropTypes.number,
    nbReadNotification: PropTypes.number,
    notificationMetadata: CommonShapes.PageMetadata,
    // from mapDispatchToProps
    fetchLastNotification: PropTypes.func.isRequired,
    sendReadNotification: PropTypes.func.isRequired,
    markAllNotificationRead: PropTypes.func.isRequired,
    fetchNotification: PropTypes.func.isRequired,
    fetchLastReadNotification: PropTypes.func.isRequired,
    deleteReadNotifications: PropTypes.func.isRequired,
  }

  static getNotif(notification) {
    const valuesArray = notification ? values(notification) : []
    return valuesArray.length ? valuesArray[0] : null
  }

  state = {
    isInstance: !this.props.project,
  }

  UNSAFE_componentWillMount = () => {
    this.startTimer()
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (!!this.notify && !isEqual(this.props.lastNotification, nextProps.lastNotification)) {
      // Open a popup if there is a new notif
      const lastNotif = NotificationListContainer.getNotif(nextProps.lastNotification)
      const previousLastNotif = NotificationListContainer.getNotif(this.props.lastNotification)

      // notify only when not already read and MORE recent notification (ie: that notification popped during last pull)
      if (lastNotif && lastNotif.content.status === 'UNREAD'
        && new Date(get(lastNotif, 'content.date', 0)).getTime() > new Date(get(previousLastNotif, 'content.date', 0))) {
        this.notify(lastNotif.content)
      }
    }
  }

  componentWillUnmount = () => {
    this.stopTimer()
  }

  refreshEverything = () => {
    const { fetchNotification, notificationMetadata } = this.props
    // compute page size to refresh all current entities in the table
    const lastPage = (notificationMetadata && notificationMetadata.number) || 0
    const totalElementsFetched = NotificationListComponent.PAGE_SIZE * (lastPage + 1)
    const requestParams = {
      state: 'UNREAD',
    }
    this.restartTimer()
    return fetchNotification(this.state.isInstance, 0, totalElementsFetched, requestParams)
  }

  getLastNotification = () => NotificationListContainer.getNotif(this.props.lastNotification)

  getLastReadNotification = () => NotificationListContainer.getNotif(this.props.lastReadNotification)

  startTimer = () => {
    const { sessionLocked, isAuthenticated } = this.props
    if (isAuthenticated && !sessionLocked) {
      // A - refresh list only if authenticated
      this.props.fetchLastNotification(this.state.isInstance)
      this.props.fetchLastReadNotification(this.state.isInstance)
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

  readAllNotifications = () => this.props.markAllNotificationRead(this.state.isInstance)

  readNotification = (notification) => {
    this.props.fetchLastReadNotification(this.state.isInstance)
    this.props.sendReadNotification(notification.id, this.state.isInstance)
      .then(() => {
        this.refreshEverything()
      })
  }

  deleteReadNotifications = () => {
    this.props.deleteReadNotifications(this.state.isInstance)
      .then(() => {
        this.refreshEverything()
      })
  }

  registerNotify = (notify) => {
    this.notify = notify
  }

  render() {
    const { isInstance } = this.state
    return (
      <ShowableAtRender show={this.props.isAuthenticated}>
        <NotificationListComponent
          readAllNotifications={this.readAllNotifications}
          readNotification={this.readNotification}
          deleteReadNotifications={this.deleteReadNotifications}
          registerNotify={this.registerNotify}
          notificationActions={isInstance ? notificationInstanceActions : notificationActions}
          notificationSelectors={notificationSelectors}
          nbNotification={this.props.nbNotification}
          lastNotification={this.getLastNotification()}
          nbReadNotification={this.props.nbReadNotification}
          lastReadNotification={this.getLastReadNotification()}
          isInstance={this.state.isInstance}
        />
      </ShowableAtRender>
    )
  }
}

export default connect(
  NotificationListContainer.mapStateToProps,
  NotificationListContainer.mapDispatchToProps,
)(NotificationListContainer)
