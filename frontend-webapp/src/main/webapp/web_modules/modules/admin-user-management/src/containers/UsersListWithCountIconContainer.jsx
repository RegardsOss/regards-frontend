/**
 * LICENSE_PLACEHOLDER
 **/
import { ActionIconWithNotifications } from '@regardsoss/components'
import { connect } from '@regardsoss/redux'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import { WaitingAccessUsersEntitiesSelectors } from '@regardsoss/admin-user-projectuser-management'

/**
 * Display user management functionalities
 */
export class UsersListWithCountIconContainer extends React.Component {

  static propTypes = {
    notificationsCount: React.PropTypes.number.isRequired,
  }

  render() {
    return (
      <ActionIconWithNotifications
        notificationsCount={this.props.notificationsCount}
        icon={<ViewLinesIcon />}
      />
    )
  }
}

const mapStateToProps = state => ({
  notificationsCount: WaitingAccessUsersEntitiesSelectors.getSize(state),
})

export default connect(mapStateToProps)(UsersListWithCountIconContainer)
