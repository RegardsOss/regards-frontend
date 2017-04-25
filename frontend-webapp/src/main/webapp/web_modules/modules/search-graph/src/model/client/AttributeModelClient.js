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

export const attributeModelAction = new DataManagement.AttributeModelAction(REDUX_ACTION_NAMESPACE)
export const reduce = DataManagement.AttributeModelReducer(REDUX_ACTION_NAMESPACE, attributeModelAction)
export const attributeModelSelector = DataManagement.AttributeModelSelector(ENTITIES_STORE_PATH)

export default {
  REDUCER_PATH,
  attributeModelAction,
  reduce,
  attributeModelSelector,
}
