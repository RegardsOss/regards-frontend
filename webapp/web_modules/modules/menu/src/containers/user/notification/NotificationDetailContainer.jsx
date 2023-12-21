import { connect } from '@regardsoss/redux'
import isEmpty from 'lodash/isEmpty'
import { notificationDetailsActions, notificationDetailsSelectors } from '../../../clients/NotificationClient'
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

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      flushDetail: () => dispatch(notificationDetailsActions.flush()),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    isInstance: PropTypes.bool.isRequired,
    // from mapStateToProps
    selectedNotification: PropTypes.shape({
      date: PropTypes.string,
      id: PropTypes.number,
      message: PropTypes.string,
      title: PropTypes.string,
    }),

    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    flushDetail: PropTypes.func.isRequired,
  }

  render() {
    const { selectedNotification, flushDetail } = this.props
    return (
      !isEmpty(selectedNotification) ? <NotificationDetailComponent notification={selectedNotification} onCloseNotification={flushDetail} /> : null
    )
  }
}

export default connect(NotificationDetailContainer.mapStateToProps, NotificationDetailContainer.mapDispatchToProps)(NotificationDetailContainer)
