/**
* LICENSE_PLACEHOLDER
**/
import { WaitingAccessProjectUserSelectors } from '@regardsoss/admin-user-projectuser-management'
import NotificationCountContainer from './NotificationCountContainer'

/**
* Shows users waiting access notification count
*/
class WaitingAccessNotificationContainer extends React.Component {

  countEntities = (state) => {
    const metadata = WaitingAccessProjectUserSelectors.getMetaData(state)
    return metadata ? metadata.totalElements : 0
  }

  render() {
    // instantiate refresh handler and notification displayer
    return <NotificationCountContainer entitiesCounter={this.countEntities} {...this.props} />
  }

}
export default WaitingAccessNotificationContainer
