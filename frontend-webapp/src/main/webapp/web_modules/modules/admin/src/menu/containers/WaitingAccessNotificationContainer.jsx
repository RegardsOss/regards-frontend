/**
* LICENSE_PLACEHOLDER
**/
import { WaitingAccessUsersEntitiesSelectors } from '@regardsoss/admin-user-projectuser-management'
import NotificationCountContainer from './NotificationCountContainer'

/**
* Shows users waiting access notification count
*/
class WaitingAccessNotificationContainer extends React.Component {

  countEntities = state => WaitingAccessUsersEntitiesSelectors.getSize(state)

  render() {
    // instantiate refresh handler and notification displayer
    return <NotificationCountContainer entitiesCounter={this.countEntities} {...this.props} />
  }

}
export default WaitingAccessNotificationContainer
