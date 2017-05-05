/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'

const namespace = 'admin-user-projectuser-management/user-group'
const userGroupActions = new DataManagementClient.UserGroupActions(namespace)
const userGroupReducer = DataManagementClient.getUserGroupReducer(namespace)
const userGroupSelectors = DataManagementClient.getUserGroupSelectors(['admin', 'user-management', 'project-user-management', 'userGroup'])

export default {
  userGroupActions,
  userGroupReducer,
  userGroupSelectors,
}
