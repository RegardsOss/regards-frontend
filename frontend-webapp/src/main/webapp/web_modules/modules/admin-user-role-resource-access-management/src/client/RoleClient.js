/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'user-management', 'role-resource-access-management', 'role']
const REDUX_ACTION_NAMESPACE = 'admin-user-role-resource-access-management/roles'

const roleActions = AdminClient.RoleActions(REDUX_ACTION_NAMESPACE)
const roleReducers = AdminClient.RoleReducers(REDUX_ACTION_NAMESPACE)
const roleSelectors = AdminClient.RoleSelectors(ENTITIES_STORE_PATH)

export default {
  roleActions,
  roleReducers,
  roleSelectors,
}
