/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

/**
 * Client to request role resources.
 *
 * @author Sébastien Binda
 */
const namespace = 'admin-user-role-management'
const roleActions = new AdminClient.RoleActions(namespace)
const roleReducer = AdminClient.getRoleReducer(namespace)
const roleSelectors = AdminClient.getRoleSelectors(['admin', 'user-management', 'role-management', 'role'])

module.exports = {
  roleActions,
  roleReducer,
  roleSelectors,
}

