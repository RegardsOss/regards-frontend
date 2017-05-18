/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Dataset entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'access-right-management', 'access-rights-management', 'dataset']
const REDUX_ACTION_NAMESPACE = 'admin-accessright-management/dataset'

const datasetReducer = DataManagementClient.DatasetReducer(REDUX_ACTION_NAMESPACE)
const datasetActions = new DataManagementClient.DatasetActions(REDUX_ACTION_NAMESPACE)
const datasetSelectors = DataManagementClient.DatasetSelectors(ENTITIES_STORE_PATH)


export default {
  datasetReducer,
  datasetActions,
  datasetSelectors,
}
