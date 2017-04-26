/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Attribute restriction entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'attribute-model-management', 'attribute-model-restriction']
const REDUX_ACTION_NAMESPACE = 'admin-data-attributemodel-management/restrictions'

const attributeModelRestrictionReducer = DataManagementClient.AttributeModelRestrictionReducer(REDUX_ACTION_NAMESPACE)
const attributeModelRestrictionActions = new DataManagementClient.AttributeModelRestrictionActions(REDUX_ACTION_NAMESPACE)
const attributeModelRestrictionSelectors = DataManagementClient.AttributeModelRestrictionSelectors(ENTITIES_STORE_PATH)


export default {
  attributeModelRestrictionReducer,
  attributeModelRestrictionActions,
  attributeModelRestrictionSelectors,
}
