/**
* LICENSE_PLACEHOLDER
**/
import { waitingAccessUsersEntitiesSelectors } from '../../client/WaitingAccessUsersEntitiesClient'
import NotificationCountContainer from './NotificationCountContainer'

/**
* Shows users waiting access notification count
*/
class WaitingAccessNotificationContainer extends React.Component {

  countEntities = state => waitingAccessUsersEntitiesSelectors.getSize(state)

  render() {
    // instantiate refresh handler and notification displayer
    return <NotificationCountContainer entitiesCounter={this.countEntities} {...this.props} />
  }

}
export default WaitingAccessNotificationContainer
