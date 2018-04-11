/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'

export const REDUCER_PATH = 'attributes'

/**
 * Server AttributeModel entities client.
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['modules.search-form', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-form/attributes'

export const AttributeModelActions = new DataManagementClient.AttributeModelActions(REDUX_ACTION_NAMESPACE)
export const AttributeModelReducer = DataManagementClient.AttributeModelReducer(REDUX_ACTION_NAMESPACE)
export const AttributeModelSelectors = DataManagementClient.AttributeModelSelectors(ENTITIES_STORE_PATH)

module.exports = {
  REDUCER_PATH,
  AttributeModelActions,
  AttributeModelReducer,
  AttributeModelSelectors,
}
