/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model attributes entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'model-attribute-management', 'model-attribute-computation-types']
const REDUX_ACTION_NAMESPACE = 'admin-data-modelattribute-management/model-attribute-computation-types'

const modelAttributeComputationTypesReducer = DataManagementClient.getModelAttributeComputationTypesReducer(REDUX_ACTION_NAMESPACE)
const modelAttributeComputationTypesActions = new DataManagementClient.ModelAttributeComputationTypesActions(REDUX_ACTION_NAMESPACE)
const modelAttributeComputationTypesSelectors = DataManagementClient.getModelAttributeComputationTypesSelectors(ENTITIES_STORE_PATH)


export default {
  modelAttributeComputationTypesReducer,
  modelAttributeComputationTypesActions,
  modelAttributeComputationTypesSelectors,
}
