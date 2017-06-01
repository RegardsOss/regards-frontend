/**
* LICENSE_PLACEHOLDER
**/
import { AccessProjectClient } from '@regardsoss/client'

export const REDUCER_PATH = 'ui-services'

const ENTITIES_STORE_PATH = ['modules.search-results', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-results/ui-services'

export const actions = new AccessProjectClient.UIServiceActions(REDUX_ACTION_NAMESPACE)
export const reducer = AccessProjectClient.getUIServiceReducer(REDUX_ACTION_NAMESPACE)
export const selectors = AccessProjectClient.getUIServiceSelectors(ENTITIES_STORE_PATH)

/**
 * Client to fetch business services working with one dataset
 */
export default {
  actions,
  reducer,
  selectors,
}
