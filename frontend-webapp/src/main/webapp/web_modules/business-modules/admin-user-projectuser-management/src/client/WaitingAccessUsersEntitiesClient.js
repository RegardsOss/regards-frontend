/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'admin-user-projectuser-management/waiting-access-users-entities'
const waitingAccessUsersEntitiesActions = new AdminClient.WaitingAccessUsersEntitiesActions(namespace)
const waitingAccessUsersEntitiesReducer = AdminClient.getWaitingAccessUsersEntitiesReducer(namespace)
const waitingAccessUsersEntitiesSelectors = AdminClient.getWaitingAccessUsersEntitiesSelectors(['admin', 'user-management', 'project-user-management', 'waitingAccessUsersEntities'])

export default {
  waitingAccessUsersEntitiesActions,
  waitingAccessUsersEntitiesReducer,
  waitingAccessUsersEntitiesSelectors,
}
