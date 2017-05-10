/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Attribute types entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'attribute-model-management', 'attribute-model-type']
const REDUX_ACTION_NAMESPACE = 'admin-data-attributemodel-management/types'

const attributeModelTypeReducer = DataManagementClient.AttributeModelTypeReducer(REDUX_ACTION_NAMESPACE)
const attributeModelTypeActions = new DataManagementClient.AttributeModelTypeActions(REDUX_ACTION_NAMESPACE)
const attributeModelTypeSelectors = DataManagementClient.AttributeModelTypeSelectors(ENTITIES_STORE_PATH)


export default {
  attributeModelTypeReducer,
  attributeModelTypeActions,
  attributeModelTypeSelectors,
}
