// import { AdminShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { notificationDetailsActions, notificationDetailsSelectors, notificationDetailsInstanceActions } from '../../../clients/NotificationClient'
import NotificationDetailComponent from '../../../components/user/notification/NotificationDetailComponent'

export class NotificationDetailContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      result: notificationDetailsSelectors.getResult(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchNotificationSignal: (instance = false, notificationId) => dispatch(
        instance
          // eslint-disable-next-line camelcase
          ? notificationDetailsInstanceActions.sendSignal('GET', {}, { notification_id: notificationId }) // eslint wont fix: server expected format
          // eslint-disable-next-line camelcase
          : notificationDetailsActions.sendSignal('GET', {}, { notification_id: notificationId }), // eslint wont fix: server expected format
      ),
      flushDetail: () => dispatch(notificationDetailsActions.flush()),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    isInstance: PropTypes.bool.isRequired,
    // from mapStateToProps
    result: PropTypes.shape({
      date: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),

    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchNotificationSignal: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    flushDetail: PropTypes.func.isRequired,
  }

  /**
  * Lifecycle method: component will mount. Used here to detect first properties change and update local state
  */
  componentDidMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { notificationId: oldId } = oldProps
    const {
      notificationId,
      flushDetail,
      fetchNotificationSignal,
      isInstance,
    } = newProps

    if (oldId !== notificationId) {
      if (notificationId) {
        fetchNotificationSignal(isInstance, notificationId)
      } else {
        flushDetail()
      }
    }
  }

  render() {
    const { result } = this.props

    return (
      result && <NotificationDetailComponent notification={result} />
    )
  }
}

export default connect(NotificationDetailContainer.mapStateToProps, NotificationDetailContainer.mapDispatchToProps)(NotificationDetailContainer)
