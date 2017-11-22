/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'

const REDUCER_PATH = 'datasets-attributes'

/**
 * Server AttributeModel entities client.
 */
const ENTITIES_STORE_PATH = ['modules.search-results', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-results/datasets-attributes'

const AttributeModelActions = new DataManagementClient.AttributeModelForModelTypeActions(REDUX_ACTION_NAMESPACE)
const AttributeModelReducer = DataManagementClient.AttributeModelForModelTypeReducer(REDUX_ACTION_NAMESPACE, AttributeModelActions)
const AttributeModelSelectors = DataManagementClient.AttributeModelForModelTypeSelectors(ENTITIES_STORE_PATH)

module.exports = {
  AttributeModelActions,
  AttributeModelReducer,
  AttributeModelSelectors,
  REDUCER_PATH,
}
