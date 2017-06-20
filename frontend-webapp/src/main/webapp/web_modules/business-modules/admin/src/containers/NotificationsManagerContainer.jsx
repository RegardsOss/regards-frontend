/**
* LICENSE_PLACEHOLDER
**/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { WaitingAccountEntitiesActions } from '@regardsoss/admin-account-management'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { connect } from '@regardsoss/redux'
import { waitingAccessUsersEntitiesActions } from '../clients/WaitingAccessUsersEntitiesClient'

/** Refresh time in milliseconds */
const refreshTimerMS = 10000


/** Notifications fetchers for project admin interface */
const projectNotificationsFetchers = [
  // fetch project users waiting project administrator validation
  () => waitingAccessUsersEntitiesActions.fetchWaitingUsersEntityList(),
]

/** Corresponding dependencies */
const projectNotificationsDependencies = [
  // fetch waiting project users dependencies
  waitingAccessUsersEntitiesActions.getDependency(RequestVerbEnum.GET),
]

/** Notifications fetchers for instance admin interface */
const instanceNotificationsFetchers = [
  // fetch account waiting instance administrator validation
  () => WaitingAccountEntitiesActions.fetchWaitingAccountsEntityList(),
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
    children: PropTypes.arrayOf(PropTypes.node),
    // from mapStateTopProps
    availableEndpoints: PropTypes.arrayOf(PropTypes.string),
    // from map mapDispatchToProps
    dependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    fetchMethods: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,
  }

  componentWillMount = () => {
    this.startTimer()
  }

  componentWillUnmount = () => {
    this.stopTimer()
  }

  refresh = () => {
    const { dependencies, availableEndpoints } = this.props
    // check required dependencies are met
    if (allMatchHateoasDisplayLogic(dependencies, availableEndpoints)) {
      this.props.fetchMethods.forEach(method => method())
    }
  }

  startTimer = () => {
    // A - refresh list
    this.refresh()
    // B - restart timer
    this.refreshTimer = setTimeout(() => this.startTimer(), refreshTimerMS)
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
})

const mapDispatchToProps = (dispatch, { isOnInstanceDashboard }) => {
  const [fetchMethods, dependencies] = isOnInstanceDashboard ?
    [projectNotificationsFetchers, projectNotificationsDependencies] :
    [instanceNotificationsFetchers, instanceNotificationsDependencies]
  return {
    fetchMethods: fetchMethods.map(method => () => dispatch(method())),
    dependencies,
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(NotificationsManager)
