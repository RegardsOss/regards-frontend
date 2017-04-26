/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'

const REDUCER_PATH = 'model-attributes'

/**
 * Server ModelAttribute entities client, fetches model to attribute model iation, given the model id (in path paramaters)
 */
const ENTITIES_STORE_PATH = ['modules.search-results', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-results/model-attributes'

export const ModelAttributesActions = new DataManagementClient.ModelAttributesActions(REDUX_ACTION_NAMESPACE)
export const ModelAttributesReducer = DataManagementClient.ModelAttributesReducer(REDUX_ACTION_NAMESPACE)
export const ModelAttributesSelectors = DataManagementClient.ModelAttributesSelectors(ENTITIES_STORE_PATH)

export default {
  REDUCER_PATH,
  ModelAttributesActions,
  ModelAttributesReducer,
  ModelAttributesSelectors,
}
