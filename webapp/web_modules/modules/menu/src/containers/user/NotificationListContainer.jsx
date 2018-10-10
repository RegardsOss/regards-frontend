/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import { AdminShapes, CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { ShowableAtRender } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import NotificationListComponent from '../../components/user/NotificationListComponent'
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
} from '../../clients/NotificationClient'
import {
  readNotificationActions,
  readNotificationInstanceActions,
} from '../../clients/ReadNotificationClient'

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
    }
  }

  static propTypes = {
    project: PropTypes.string,
    // from mapStateToProps
    lastNotification: AdminShapes.NotificationList, // THIS IS A LIST WITH ONE ITEM INSIDE
    lastReadNotification: AdminShapes.NotificationList, // THIS IS A LIST WITH ONE ITEM INSIDE
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
  }

  constructor(props) {
    super(props)
    this.state = {
      isInstance: !props.project,
    }
  }

  componentWillMount = () => {
    this.startTimer()
  }

  componentWillReceiveProps = (nextProps) => {
    if (!isEqual(this.props.lastNotification, nextProps.lastNotification) && !!this.notify) {
      // Open a popup if there is a new notif
      const lastNotif = nextProps.lastNotification[keys(nextProps.lastNotification)[0]]

      if (lastNotif && lastNotif.content.status === 'UNREAD') {
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
    return fetchNotification(this.state.isInstance, 0, totalElementsFetched, requestParams)
  }

  getLastNotification = () => (
    this.props.lastNotification[keys(this.props.lastNotification)[0]]
  )

  getLastReadNotification = () => (
    this.props.lastReadNotification[keys(this.props.lastReadNotification)[0]]
  )

  startTimer = () => {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
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

  readAllNotifications = () => this.props.markAllNotificationRead(this.state.isInstance)

  readNotification = (notification) => {
    this.props.sendReadNotification(notification.id, this.state.isInstance)
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
