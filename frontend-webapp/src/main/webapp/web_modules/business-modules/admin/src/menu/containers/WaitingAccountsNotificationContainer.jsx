/**
* LICENSE_PLACEHOLDER
**/
import { WaitingAccountEntitiesSelectors } from '@regardsoss/admin-account-management'
import NotificationCountContainer from './NotificationCountContainer'

/**
* Shows users waiting access notification count
*/
class WaitingAccountsNotificationContainer extends React.Component {
  countEntities = state => WaitingAccountEntitiesSelectors.getSize(state)

  render() {
    // instantiate refresh handler and notification displayer
    return <NotificationCountContainer entitiesCounter={this.countEntities} {...this.props} />
  }
}
export default WaitingAccountsNotificationContainer
