/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'


/**
 * Server AttributeModel entities client.
 */
const ENTITIES_STORE_PATH = ['modules.search-results', 'dataobjects-attributes']
const REDUX_ACTION_NAMESPACE = 'search-results/dataobjects-attributes'

const DataAttributeModelActions = new DataManagementClient.AttributeModelForModelTypeActions(REDUX_ACTION_NAMESPACE)
const DataAttributeModelReducer = DataManagementClient.AttributeModelForModelTypeReducer(REDUX_ACTION_NAMESPACE)
const DataAttributeModelSelectors = DataManagementClient.AttributeModelForModelTypeSelectors(ENTITIES_STORE_PATH)

module.exports = {
  DataAttributeModelActions,
  DataAttributeModelReducer,
  DataAttributeModelSelectors,
}
