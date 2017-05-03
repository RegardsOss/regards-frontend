/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'collection', 'model']
const REDUX_ACTION_NAMESPACE = 'admin-data-collection-management/model'

const modelReducer = DataManagementClient.ModelReducer(REDUX_ACTION_NAMESPACE)
const modelActions = new DataManagementClient.ModelActions(REDUX_ACTION_NAMESPACE)
const modelSelectors = DataManagementClient.ModelSelectors(ENTITIES_STORE_PATH)


export default {
  modelReducer,
  modelActions,
  modelSelectors,
}
