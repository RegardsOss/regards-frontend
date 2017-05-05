/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const namespace = 'admin-user-role-resource-access-management/roles'
const roleActions = new AdminClient.RoleActions(namespace)
const roleReducer = AdminClient.getRoleReducer(namespace)
const roleSelectors = AdminClient.getRoleSelectors(['admin', 'user-management', 'role-resource-access-management', 'role'])

export default {
  roleActions,
  roleReducer,
  roleSelectors,
}
