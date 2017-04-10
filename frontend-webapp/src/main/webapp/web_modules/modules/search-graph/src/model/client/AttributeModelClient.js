/**
* LICENSE_PLACEHOLDER
**/
import { DataManagement } from '@regardsoss/client'

export const REDUCER_PATH = 'attributes'

/**
 * Server AttributeModel entities client.
 */
const ENTITIES_STORE_PATH = ['modules.search-graph', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-graph/attributes'

export const AttributeModelAction = new DataManagement.AttributeModelAction(REDUX_ACTION_NAMESPACE)
export const AttributeModelReducer = DataManagement.AttributeModelReducer(REDUX_ACTION_NAMESPACE, AttributeModelAction)
export const AttributeModelSelector = DataManagement.AttributeModelSelector(ENTITIES_STORE_PATH)

export default {
  AttributeModelAction,
  AttributeModelReducer,
  AttributeModelSelector,
}
