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
import find from 'lodash/find'
import { AdminShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { ShowableAtRender } from '@regardsoss/display-control'
import NotificationListComponent from '../components/NotificationListComponent'
import { notificationActions, notificationSelectors } from '../clients/NotificationClient'

/** Refresh time in milliseconds */
const refreshTimerMS = 10000

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
      fetchNotifications: () => dispatch(notificationActions.fetchEntityList()),
    }
  }

  static propTypes = {
    // from mapStateToProps
    notifications: AdminShapes.NotificationList,
    isAuthenticated: PropTypes.bool,
    // from mapDispatchToProps
    fetchNotifications: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    this.startTimer()
  }

  componentWillReceiveProps = (nextProps) => {
    if (Object.keys(this.props.notifications).length > 0) {
      this.newNotifications = filter(
        nextProps.notifications,
        el => !find(this.props.notifications, o => o.id === el.id),
      )
    }
  }

  componentWillUnmount = () => {
    this.stopTimer()
  }

  startTimer = () => {
    // A - refresh list
    this.props.fetchNotifications()
    // B - restart timer
    this.refreshTimer = setTimeout(() => this.startTimer(), refreshTimerMS)
  }

  stopTimer = () => {
    clearTimeout(this.refreshTimer)
  }

  render() {
    return (
      <ShowableAtRender show={this.props.isAuthenticated}>
        <NotificationListComponent notifications={this.props.notifications} newNotifications={this.newNotifications} />
      </ShowableAtRender>
    )
  }
}
export default connect(
  NotificationListContainer.mapStateToProps,
  NotificationListContainer.mapDispatchToProps,
)(NotificationListContainer)
