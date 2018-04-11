/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'

/**
 * Server AttributeModel entities client - dedicated to Document
 */
const ENTITIES_STORE_PATH = ['modules.search-results', 'documents-attributes']
const REDUX_ACTION_NAMESPACE = 'search-results/documents-attributes'

const DocumentAttributeModelActions = new DataManagementClient.AttributeModelForModelTypeActions(REDUX_ACTION_NAMESPACE)
const DocumentAttributeModelReducer = DataManagementClient.AttributeModelForModelTypeReducer(REDUX_ACTION_NAMESPACE)
const DocumentAttributeModelSelectors = DataManagementClient.AttributeModelForModelTypeSelectors(ENTITIES_STORE_PATH)

module.exports = {
  DocumentAttributeModelActions,
  DocumentAttributeModelReducer,
  DocumentAttributeModelSelectors,
}
