/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'user-management', 'role-resource-access-management', 'role-resources']
const REDUX_ACTION_NAMESPACE = 'admin-user-role-resource-access-management/role-resources'

const roleResourceActions = AdminClient.RoleResourceActions(REDUX_ACTION_NAMESPACE)
const roleResourceReducers = AdminClient.RoleResourceReducers(REDUX_ACTION_NAMESPACE)
const roleResourceSelectors = AdminClient.RoleResourceSelectors(ENTITIES_STORE_PATH)

export default {
  roleResourceActions,
  roleResourceReducers,
  roleResourceSelectors,
}
