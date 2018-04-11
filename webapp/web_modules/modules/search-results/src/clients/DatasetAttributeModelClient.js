/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'


/**
 * Server AttributeModel entities client.
 */
const ENTITIES_STORE_PATH = ['modules.search-results', 'datasets-attributes']
const REDUX_ACTION_NAMESPACE = 'search-results/datasets-attributes'

const DatasetAttributeModelActions = new DataManagementClient.AttributeModelForModelTypeActions(REDUX_ACTION_NAMESPACE)
const DatasetAttributeModelReducer = DataManagementClient.AttributeModelForModelTypeReducer(REDUX_ACTION_NAMESPACE)
const DatasetAttributeModelSelectors = DataManagementClient.AttributeModelForModelTypeSelectors(ENTITIES_STORE_PATH)

module.exports = {
  DatasetAttributeModelActions,
  DatasetAttributeModelReducer,
  DatasetAttributeModelSelectors,
}
