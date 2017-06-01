/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'user-management', 'role-resource-access-management', 'resource-access']
const REDUX_ACTION_NAMESPACE = 'admin-user-role-resource-access-management/resource-access'

const resourceAccessActions = AdminClient.ResourceAccessActions(REDUX_ACTION_NAMESPACE)
const resourceAccessReducers = AdminClient.ResourceAccessReducers(REDUX_ACTION_NAMESPACE)
const resourceAccessSelectors = AdminClient.ResourceAccessSelectors(ENTITIES_STORE_PATH)

export default {
  resourceAccessActions,
  resourceAccessReducers,
  resourceAccessSelectors,
}
