/**
 * LICENSE_PLACEHOLDER
 **/
import { ActionIconWithNotifications } from '@regardsoss/components'
import { connect } from '@regardsoss/redux'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import { waitingAccessUsersEntitiesSelectors } from '../clients/WaitingAccessUsersEntitiesClient'

/**
 * Display user management functionalities
 */
export class UsersListWithCountIconContainer extends React.Component {

  static propTypes = {
    notificationsCount: PropTypes.number.isRequired,
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
  notificationsCount: waitingAccessUsersEntitiesSelectors.getSize(state),
})

export default connect(mapStateToProps)(UsersListWithCountIconContainer)
