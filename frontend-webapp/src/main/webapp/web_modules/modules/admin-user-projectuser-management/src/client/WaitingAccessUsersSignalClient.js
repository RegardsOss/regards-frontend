/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'admin-user-projectuser-management/waiting-accounts-signals'
const waitingAccessUsersSignalActions = new AdminClient.WaitingAccessUsersSignalActions(namespace)
const waitingAccessUsersSignalReducer = AdminClient.getWaitingAccessUsersSignalReducer(namespace)
const waitingAccessUsersSignalSelectors = AdminClient.getWaitingAccessUsersSignalSelectors(['admin', 'user-management', 'project-user-management', 'waitingAccessUsersSignals'])

export default {
  waitingAccessUsersSignalActions,
  waitingAccessUsersSignalReducer,
  waitingAccessUsersSignalSelectors,
}
