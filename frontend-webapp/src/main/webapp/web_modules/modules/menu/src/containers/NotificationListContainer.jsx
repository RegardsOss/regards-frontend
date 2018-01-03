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
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { ShowableAtRender } from '@regardsoss/display-control'
import NotificationListComponent from '../components/NotificationListComponent'
import { notificationActions, notificationSelectors } from '../clients/NotificationClient'

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
    // project identifier
    project: PropTypes.string.isRequired,
    // from mapStateToProps
    notifications: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchNotifications: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchNotifications()
  }

  render() {
    const { notifications } = this.props
    console.log(notifications)
    return (
      // Show only when module cart ID has been resolved (user is logged and has rights, module exists)
      <ShowableAtRender show={this.props.isAuthenticated}>
        <NotificationListComponent objectsCount={4} />
      </ShowableAtRender>
    )
  }
}
export default connect(
  NotificationListContainer.mapStateToProps,
  NotificationListContainer.mapDispatchToProps,
)(NotificationListContainer)
