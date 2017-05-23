/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Datasource entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'dataset']
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/dataset'

const datasetReducer = DataManagementClient.DatasetReducer(REDUX_ACTION_NAMESPACE)
const datasetActions = new DataManagementClient.DatasetActions(REDUX_ACTION_NAMESPACE)
const datasetSelectors = DataManagementClient.DatasetSelectors(ENTITIES_STORE_PATH)

export default {
  datasetReducer,
  datasetActions,
  datasetSelectors,
}
