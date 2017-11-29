/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'

/**
 * Server ModelAttribute entities client, fetches model to attribute model iation, given the model id (in path paramaters)
 */
const ENTITIES_STORE_PATH = ['modules.search-results', 'model-attributes']
const REDUX_ACTION_NAMESPACE = 'search-results/model-attributes'

const ModelAttributesActions = new DataManagementClient.ModelAttributesActions(REDUX_ACTION_NAMESPACE)
const ModelAttributesReducer = DataManagementClient.ModelAttributesReducer(REDUX_ACTION_NAMESPACE)
const ModelAttributesSelectors = DataManagementClient.ModelAttributesSelectors(ENTITIES_STORE_PATH)

module.exports = {
  ModelAttributesActions,
  ModelAttributesReducer,
  ModelAttributesSelectors,
}
