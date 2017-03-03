/**
* LICENSE_PLACEHOLDER
**/
import { WaitingAccessUsersFetchSelectors } from '@regardsoss/admin-user-projectuser-management'
import NotificationCountContainer from './NotificationCountContainer'

/**
* Shows users waiting access notification count
*/
class WaitingAccessNotificationContainer extends React.Component {

  countEntities = state => WaitingAccessUsersFetchSelectors.getSize(state)

  render() {
    // instantiate refresh handler and notification displayer
    return <NotificationCountContainer entitiesCounter={this.countEntities} {...this.props} />
  }

}
export default WaitingAccessNotificationContainer
