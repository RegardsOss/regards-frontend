/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Dataset entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['modules.search-form', 'models']
const REDUX_ACTION_NAMESPACE = 'form/datasets/models'

const modelReducer = DataManagementClient.ModelReducer(REDUX_ACTION_NAMESPACE)
const modelActions = new DataManagementClient.ModelActions(REDUX_ACTION_NAMESPACE)
const modelSelectors = DataManagementClient.ModelSelectors(ENTITIES_STORE_PATH)


export default {
  modelReducer,
  modelActions,
  modelSelectors,
}
