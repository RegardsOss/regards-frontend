/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'

const namespace = 'admin-user-projectuser-management/access-group'
const accessGroupActions = new DataManagementClient.AccessGroupActions(namespace)
const accessGroupReducer = DataManagementClient.getAccessGroupReducer(namespace)
const accessGroupSelectors = DataManagementClient.getAccessGroupSelectors(['admin', 'user-management', 'project-user-management', 'accessGroup'])

module.exports = {
  accessGroupActions,
  accessGroupReducer,
  accessGroupSelectors,
}
