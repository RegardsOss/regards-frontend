/**
* LICENSE_PLACEHOLDER
**/
import { WaitingAccessProjectUserActions, WaitingAccessProjectUserSelectors } from '@regardsoss/admin-user-projectuser-management'
import NotificationCountContainer from './NotificationCountContainer'

/**
*Shows users waiting access notification count
*/
class WaitingAccessNotificationContainer extends React.Component {
  render() {
    return (
      <NotificationCountContainer
        fetchAction={() => WaitingAccessProjectUserActions.fetchWaitingUsersEntityList(0, 100)}
        entitiesCounter={state => WaitingAccessProjectUserSelectors.getMetaData(state) ? WaitingAccessProjectUserSelectors.getMetaData(state).totalElements : 0}
      />
    )
  }
}
export default WaitingAccessNotificationContainer
