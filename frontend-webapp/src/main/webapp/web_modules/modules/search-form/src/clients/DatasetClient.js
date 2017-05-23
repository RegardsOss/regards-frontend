/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Dataset entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['modules.search-form', 'datasets']
const REDUX_ACTION_NAMESPACE = 'form/datasets'

const datasetReducer = DataManagementClient.DatasetReducer(REDUX_ACTION_NAMESPACE)
const datasetActions = new DataManagementClient.DatasetActions(REDUX_ACTION_NAMESPACE)
const datasetSelectors = DataManagementClient.DatasetSelectors(ENTITIES_STORE_PATH)


export default {
  datasetReducer,
  datasetActions,
  datasetSelectors,
}
