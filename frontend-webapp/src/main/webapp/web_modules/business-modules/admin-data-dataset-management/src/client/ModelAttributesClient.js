/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'model-attributes']
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/model-attributes'

const modelAttributesReducer = DataManagementClient.ModelAttributesReducer(REDUX_ACTION_NAMESPACE)
const modelAttributesActions = new DataManagementClient.ModelAttributesActions(REDUX_ACTION_NAMESPACE)
const modelAttributesSelectors = DataManagementClient.ModelAttributesSelectors(ENTITIES_STORE_PATH)


export default {
  modelAttributesReducer,
  modelAttributesActions,
  modelAttributesSelectors,
}
