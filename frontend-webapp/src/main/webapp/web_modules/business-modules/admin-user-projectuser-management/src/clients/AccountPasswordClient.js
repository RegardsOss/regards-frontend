/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

export const REDUCER_PATH = 'accountPassword'

/**
 * Server password signals client
 */
const ENTITIES_STORE_PATH = ['admin', 'user-management', 'project-user-management', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'admin-user-projectuser-management/accountPassword'

export const accountPasswordActions = new AdminClient.AccountPasswordActions(REDUX_ACTION_NAMESPACE)
export const accountPasswordReducer = AdminClient.getAccountPasswordReducer(REDUX_ACTION_NAMESPACE)
export const accountPasswordSelectors = AdminClient.getAccountPasswordSelectors(ENTITIES_STORE_PATH)

export default {
  accountPasswordActions,
  accountPasswordReducer,
  accountPasswordSelectors,
}
