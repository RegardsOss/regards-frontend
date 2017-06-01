/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model attributes entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'model-attribute-management', 'attribute-model']
const REDUX_ACTION_NAMESPACE = 'admin-data-modelattribute-management/attribute-model'

const attributeModelReducer = DataManagementClient.AttributeModelReducer(REDUX_ACTION_NAMESPACE)
const attributeModelActions = new DataManagementClient.AttributeModelActions(REDUX_ACTION_NAMESPACE)
const attributeModelSelectors = DataManagementClient.AttributeModelSelectors(ENTITIES_STORE_PATH)


export default {
  attributeModelReducer,
  attributeModelActions,
  attributeModelSelectors,
}
