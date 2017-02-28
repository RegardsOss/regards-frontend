/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'


const refreshTimerMS = 10000

/**
* Container for users sidebar elements in project (fetches the results on timer, to show the notifications count changes)
*/
class NotificationCountContainer extends React.Component {

  static propTypes = {
    notificationsCount: React.PropTypes.number.isRequired,
    fetchEntities: React.PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    this.startTimer()
  }

  componentWillUnmount = () => {
    // delete the refresh timer
    clearTimeout(this.refreshTimer)
  }

  refresh = () => {
    this.props.fetchEntities()
  }

  startTimer = () => {
    // A - refresh list
    this.refresh()
    // B - restart timer
    this.refreshTimer = setTimeout(() => this.startTimer(), refreshTimerMS)
  }


  render() {
    const notificationsCount = this.props.notificationsCount
    return notificationsCount ? <span>{notificationsCount}</span> : null
  }
}

const getMapStateToProps = entitiesCounter => state => ({
  notificationsCount: entitiesCounter(state),
})

const getMapDispatchToProps = fetchAction => dispatch => ({
  fetchEntities: () => dispatch(fetchAction(...arguments)),
})

// Connected container builder, requires both entity fetcher (action fetch list method) and entitiesCounter
const getConnected = (fetchAction, entitiesCounter) => connect(getMapStateToProps(entitiesCounter), getMapDispatchToProps(fetchAction))(NotificationCountContainer)

// export the connected ccontainer builder
const ConnectedContainer = ({ fetchAction, entitiesCounter }) => {
  const Connected = getConnected(fetchAction, entitiesCounter)
  return <Connected />
}
ConnectedContainer.propTypes = { fetchAction: React.PropTypes.func.isRequired, entitiesCounter: React.PropTypes.func.isRequired }

export default ConnectedContainer
