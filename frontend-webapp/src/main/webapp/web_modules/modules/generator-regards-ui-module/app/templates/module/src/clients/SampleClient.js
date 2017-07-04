/**
 * LICENSE_PLACEHOLDER
 **/
import { DataManagementClient } from '@regardsoss/client'

/**
 * Client to access attributes from backend-server
 * @author <%= author %>
 */
export const REDUCER_PATH = 'attributes'

/**
 * Server AttributeModel entities client.
 */
const ENTITIES_STORE_PATH = ['modules.<%= name %>', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = '<%= name %>/attributes'

export const AttributeModelActions = new DataManagementClient.AttributeModelActions(REDUX_ACTION_NAMESPACE)
export const AttributeModelReducer = DataManagementClient.AttributeModelReducer(REDUX_ACTION_NAMESPACE, AttributeModelActions)
export const AttributeModelSelectors = DataManagementClient.AttributeModelSelectors(ENTITIES_STORE_PATH)

export default {
  AttributeModelActions,
  AttributeModelReducer,
  AttributeModelSelectors,
}
