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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { AdminInstanceClient } from '@regardsoss/client'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { connect } from '@regardsoss/redux'
import { waitingAccessUsersEntitiesActions } from '../clients/WaitingAccessUsersEntitiesClient'

/** Notifications fetchers for project admin interface */
const projectNotificationsFetchers = [
  // fetch project users waiting project administrator validation
  () => waitingAccessUsersEntitiesActions.fetchWaitingUsersEntityList(),
]

/** Corresponding dependencies */
const projectNotificationsDependencies = [
  // fetch waiting project users dependencies
  waitingAccessUsersEntitiesActions.getDependency(RequestVerbEnum.POST),
]

/** Notifications fetchers for instance admin interface */
const accountWaitingActions = new AdminInstanceClient.AccountWaitingActions() // default client actions
const instanceNotificationsFetchers = [
  // fetch account waiting instance administrator validation
  () => accountWaitingActions.fetchWaitingAccountsEntityList(),
]

/** Corresponding dependencies: none (instance has all dependencies valid) */
const instanceNotificationsDependencies = []

/**
* Installs all notifications handlers in Admin application
*/
class NotificationsManager extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    isOnInstanceDashboard: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // from mapStateTopProps
    authentication: AuthenticateShape,
    availableEndpoints: PropTypes.arrayOf(PropTypes.string),
    // from map mapDispatchToProps
    dependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    fetchMethods: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,
  }

  UNSAFE_componentWillMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  refresh = () => {
    const { dependencies, availableEndpoints, authentication } = this.props
    // check required dependencies are met
    if (authentication.result && !authentication.sessionLocked && allMatchHateoasDisplayLogic(dependencies, availableEndpoints)) {
      this.props.fetchMethods.forEach((method) => method())
    }
  }

  startTimer = () => {
    // A - refresh list
    this.refresh()
    // B - restart timer
    this.refreshTimer = setTimeout(() => this.startTimer(), STATIC_CONF.POLLING_TIMER_WAITING_USER)
  }

  stopTimer = () => {
    clearTimeout(this.refreshTimer)
  }

  render() {
    const { children } = this.props
    return <div>{children}</div>
  }
}

const mapStateTopProps = (state, { isOnInstanceDashboard }) => ({
  availableEndpoints: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
  authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
})

const mapDispatchToProps = (dispatch, { isOnInstanceDashboard }) => {
  const [fetchMethods, dependencies] = isOnInstanceDashboard
    ? [instanceNotificationsFetchers, instanceNotificationsDependencies]
    : [projectNotificationsFetchers, projectNotificationsDependencies]
  return {
    fetchMethods: fetchMethods.map((method) => () => dispatch(method())),
    dependencies,
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(NotificationsManager)
