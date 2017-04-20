/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server Roles entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'user-management', 'role-resource-access-management', 'resource-roles']
const REDUX_ACTION_NAMESPACE = 'admin-user-role-resource-access-management/resource-roles'

const resourceRolesActions = AdminClient.ResourceRolesActions(REDUX_ACTION_NAMESPACE)
const resourceRolesReducers = AdminClient.ResourceRolesReducers(REDUX_ACTION_NAMESPACE)
const resourceRolesSelectors = AdminClient.ResourceRolesSelectors(ENTITIES_STORE_PATH)

export default {
  resourceRolesActions,
  resourceRolesReducers,
  resourceRolesSelectors,
}
