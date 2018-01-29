/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import { AdminShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { ShowableAtRender } from '@regardsoss/display-control'
import NotificationListComponent from '../components/NotificationListComponent'
import {
  notificationActions,
  notificationInstanceActions,
  notificationSelectors,
} from '../clients/NotificationClient'
import {
  readNotificationActions,
  readNotificationInstanceActions,
} from '../clients/ReadNotificationClient'

/** Refresh time in milliseconds */
const refreshTimerMS = 2000

/**
 * Notification list container, shows the number of unread notifications.
 * @author Maxime Bouveron
 */
export class NotificationListContainer extends React.Component {
  static mapStateToProps(state) {
    return {
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      notifications: notificationSelectors.getList(state),
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      fetchNotifications: (instance = false) =>
        dispatch(
          instance
            ? notificationInstanceActions.fetchEntityList()
            : notificationActions.fetchEntityList(),
        ),
      sendReadNotification: (notificationId, instance = false) =>
        dispatch(
          instance
            ? readNotificationInstanceActions.readNotification(notificationId)
            : readNotificationActions.readNotification(notificationId),
        ),
    }
  }

  static propTypes = {
    project: PropTypes.string,
    // from mapStateToProps
    notifications: AdminShapes.NotificationList,
    isAuthenticated: PropTypes.bool,
    // from mapDispatchToProps
    fetchNotifications: PropTypes.func.isRequired,
    sendReadNotification: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    this.startTimer()
    this.newNotifications = []
    this.unreadNotifications = []
    this.readNotifications = []
  }

  componentWillReceiveProps = (nextProps) => {
    if (!isEqual(this.props.notifications, nextProps.notifications)) {
      const sortNotificationByDate = (a, b) => new Date(b.date) - new Date(a.date)

      this.unreadNotifications = filter(
        nextProps.notifications,
        notif => notif.status === 'UNREAD',
      ).sort(sortNotificationByDate)

      this.readNotifications = filter(
        nextProps.notifications,
        notif => notif.status === 'READ',
      ).sort(sortNotificationByDate)

      if (Object.keys(this.props.notifications).length > 0 && !!this.notify) {
        forEach(nextProps.notifications, (notif) => {
          if (
            !find(this.props.notifications, o => o.id === notif.id) &&
            notif.status === 'UNREAD'
          ) {
            this.notify(notif)
          }
        })
      }
    }
  }

  componentWillUnmount = () => {
    this.stopTimer()
  }

  startTimer = () => {
    if (this.props.isAuthenticated) {
      // A - refresh list only if authenticated
      this.props.fetchNotifications(this.props.project === 'instance')
    }
    // B - restart timer
    this.refreshTimer = setTimeout(() => this.startTimer(), refreshTimerMS)
  }

  stopTimer = () => {
    clearTimeout(this.refreshTimer)
  }

  readAllNotifications = (unreadNotifications) => {
    unreadNotifications.forEach((notif) => {
      this.readNotification(notif)
    })
  }

  readNotification = (notification) => {
    if (notification.status === 'UNREAD') {
      this.props
        .sendReadNotification(notification.id, this.props.project === 'instance')
        .then(() => this.props.fetchNotifications(this.props.project === 'instance'))
    }
  }

  registerNotify = (notify) => {
    this.notify = notify
  }

  render() {
    return (
      <ShowableAtRender show={this.props.isAuthenticated}>
        <NotificationListComponent
          unreadNotifications={this.unreadNotifications}
          readNotifications={this.readNotifications}
          readAllNotifications={this.readAllNotifications}
          readNotification={this.readNotification}
          registerNotify={this.registerNotify}
        />
      </ShowableAtRender>
    )
  }
}
export default connect(
  NotificationListContainer.mapStateToProps,
  NotificationListContainer.mapDispatchToProps,
)(NotificationListContainer)
