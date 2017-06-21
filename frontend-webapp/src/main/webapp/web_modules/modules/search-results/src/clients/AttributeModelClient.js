/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'

export const REDUCER_PATH = 'attributes'

/**
 * Server AttributeModel entities client.
 */
const ENTITIES_STORE_PATH = ['modules.search-results', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-results/attributes'

export const AttributeModelActions = new DataManagementClient.AttributeModelForModelTypeActions(REDUX_ACTION_NAMESPACE)
export const AttributeModelReducer = DataManagementClient.AttributeModelForModelTypeReducer(REDUX_ACTION_NAMESPACE, AttributeModelActions)
export const AttributeModelSelectors = DataManagementClient.AttributeModelForModelTypeSelectors(ENTITIES_STORE_PATH)

export default {
  AttributeModelActions,
  AttributeModelReducer,
  AttributeModelSelectors,
}
