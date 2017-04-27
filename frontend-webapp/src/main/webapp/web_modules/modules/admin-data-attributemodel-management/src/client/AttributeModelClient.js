/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Attribute model entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'attribute-model-management', 'attribute-model']
const REDUX_ACTION_NAMESPACE = 'admin-data-attributemodel-management'

const attributeModelReducer = DataManagementClient.AttributeModelReducer(REDUX_ACTION_NAMESPACE)
const attributeModelActions = new DataManagementClient.AttributeModelActions(REDUX_ACTION_NAMESPACE)
const attributeModelSelectors = DataManagementClient.AttributeModelSelectors(ENTITIES_STORE_PATH)


export default {
  attributeModelReducer,
  attributeModelActions,
  attributeModelSelectors,
}
