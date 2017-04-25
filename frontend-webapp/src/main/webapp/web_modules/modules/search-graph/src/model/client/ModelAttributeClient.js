/**
* LICENSE_PLACEHOLDER
**/
import { DataManagement } from '@regardsoss/client'

const REDUCER_PATH = 'attributes-model-'

/**
 * Server ModelAttribute entities client, fetches model to attribute model iation, given the model id (in path paramaters)
 */
const ENTITIES_STORE_PATH = ['modules.search-graph', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-graph/attributes-model-'

export const modelAttributesAction = new DataManagement.ModelAttributesAction(REDUX_ACTION_NAMESPACE)
export const reduce = DataManagement.ModelAttributesReducer(modelAttributesAction)
export const modelAttributesSelector = DataManagement.ModelAttributesSelector(ENTITIES_STORE_PATH)

export default {
  REDUCER_PATH,
  modelAttributesAction,
  reduce,
  modelAttributesSelector,
}
