/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'admin/waiting-access-users'
const waitingAccessUsersEntitiesActions = new AdminClient.WaitingAccessUsersEntitiesActions(namespace)
const waitingAccessUsersEntitiesReducer = AdminClient.getWaitingAccessUsersEntitiesReducer(namespace)
const waitingAccessUsersEntitiesSelectors = AdminClient.getWaitingAccessUsersEntitiesSelectors(['admin', 'notifications-waiting-users'])

export default {
  waitingAccessUsersEntitiesActions,
  waitingAccessUsersEntitiesReducer,
  waitingAccessUsersEntitiesSelectors,
}
