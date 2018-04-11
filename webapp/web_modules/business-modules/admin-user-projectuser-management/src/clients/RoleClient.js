/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'admin-user-projectuser-management/role'
const roleActions = new AdminClient.RoleActions(namespace)
const roleReducer = AdminClient.getRoleReducer(namespace)
const roleSelectors = AdminClient.getRoleSelectors(['admin', 'user-management', 'project-user-management', 'role'])

module.exports = {
  roleActions,
  roleReducer,
  roleSelectors,
}

