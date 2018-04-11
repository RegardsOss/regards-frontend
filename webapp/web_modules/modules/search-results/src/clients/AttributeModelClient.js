/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'


/**
 * Server AttributeModel entities client.
 */
const ENTITIES_STORE_PATH = ['modules.search-results', 'attributes']
const REDUX_ACTION_NAMESPACE = 'search-results/attributes'

const AttributeModelActions = new DataManagementClient.AttributeModelActions(REDUX_ACTION_NAMESPACE)
const AttributeModelReducer = DataManagementClient.AttributeModelReducer(REDUX_ACTION_NAMESPACE)
const AttributeModelSelectors = DataManagementClient.AttributeModelSelectors(ENTITIES_STORE_PATH)

module.exports = {
  AttributeModelActions,
  AttributeModelReducer,
  AttributeModelSelectors,
}
