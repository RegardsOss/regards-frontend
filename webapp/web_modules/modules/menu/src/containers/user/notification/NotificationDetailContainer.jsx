import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { notificationDetailsSelectors } from '../../../clients/NotificationClient'
import NotificationDetailComponent from '../../../components/user/notification/NotificationDetailComponent'

/**
 * Notification detail container. Retrieve selected notification from store
 * @author Théo Lasserre
 */
export class NotificationDetailContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      selectedNotification: notificationDetailsSelectors.getResult(state),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    isInstance: PropTypes.bool.isRequired,
    // from mapStateToProps
    selectedNotification: AdminShapes.Notification,
  }

  static defaultProps = {
    selectedNotification: null,
  }

  render() {
    const { selectedNotification } = this.props
    return (
      <NotificationDetailComponent notification={selectedNotification} />
    )
  }
}

export default connect(NotificationDetailContainer.mapStateToProps, null)(NotificationDetailContainer)
