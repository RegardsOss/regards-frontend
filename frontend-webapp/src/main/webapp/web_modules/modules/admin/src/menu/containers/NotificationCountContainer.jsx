/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import Badge from 'material-ui/Badge'


const refreshTimerMS = 10000

/**
* Container for observable list counts (fetches the results on timer, to show the notifications count changes)
*/
class NotificationCountContainer extends React.Component {

  static propTypes = {
    notificationsCount: React.PropTypes.number.isRequired,
    // used in map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesCounter: React.PropTypes.func.isRequired,
    // required, see workaround comment in render method
    // eslint-disable-next-line react/forbid-prop-types
    style: React.PropTypes.object,
  }

  startTimer = () => {
    // A - refresh list
    this.refresh()
    // B - restart timer
    this.refreshTimer = setTimeout(() => this.startTimer(), refreshTimerMS)
  }

  render() {
    const { notificationsCount, style } = this.props
    /* XXX-workaround material UI MenuItem uses style directly on contained components,
    which is terribly wrong and forces this container to report it here */
    return notificationsCount ? <Badge className="selenium-notificationCount" badgeContent={notificationsCount} style={style} primary /> : null
  }
}

const mapStateToProps = (state, { entitiesCounter }) => ({
  notificationsCount: entitiesCounter(state),
})

export default connect(mapStateToProps, null)(NotificationCountContainer)
