/**
* LICENSE_PLACEHOLDER
**/
import { WaitingAccessProjectUserActions } from '@regardsoss/admin-user-projectuser-management'
import { connect } from '@regardsoss/redux'

/** Refresh time in milliseconds */
const refreshTimerMS = 10000

/**
 * Notifications fetchers for project admin interface
 */
const projectNotificationsFetchers = [
  // fetch project users waiting access
  () => WaitingAccessProjectUserActions.fetchWaitingUsersEntityList(0, 100),
]

/**
 * Notifications fetchers for instance admin interface
 */
const instanceNotificationsFetchers = [

]

/**
* Installs all notifications handlers in Admin application
*/
class NotificationsManager extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    isOnInstanceDashboard: React.PropTypes.bool.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.node),
    // from map mapDispatchToProps
    fetchMethods: React.PropTypes.arrayOf(React.PropTypes.func.isRequired).isRequired,
  }

  componentWillMount = () => {
    this.startTimer()
  }

  componentWillUnmount = () => {
    this.stopTimer()
  }

  refresh = () => {
    this.props.fetchMethods.forEach(method => method())
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

const mapDispatchToProps = (dispatch, { isOnInstanceDashboard }) => {
  const fetchMethods = isOnInstanceDashboard ? projectNotificationsFetchers : instanceNotificationsFetchers
  return {
    fetchMethods: fetchMethods.map(method => () => dispatch(method())),
  }
}

export default connect(null, mapDispatchToProps)(NotificationsManager)
