/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

export const REDUCER_PATH = 'accountPassword'

/**
 * Server password signals client
 */
const ENTITIES_STORE_PATH = ['modules.authentication', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'authentication/accountPassword'

export const accountPasswordActions = new AdminClient.AccountPasswordActions(REDUX_ACTION_NAMESPACE)
export const accountPasswordReducer = AdminClient.getAccountPasswordReducer(REDUX_ACTION_NAMESPACE)
export const accountPasswordSelectors = AdminClient.getAccountPasswordSelectors(ENTITIES_STORE_PATH)

module.exports = {
  accountPasswordActions,
  accountPasswordReducer,
  accountPasswordSelectors,
}
