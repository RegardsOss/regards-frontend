

/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Datasource entities client.
 *
 * @author Léo Mieulet
 */
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/datasetValidSubsetting'

const datasetValidSubsettingTestReducer = DataManagementClient.getDatasetValidSubsettingTestReducer(REDUX_ACTION_NAMESPACE)
const datasetValidSubsettingTestActions = new DataManagementClient.DatasetValidSubsettingTestActions(REDUX_ACTION_NAMESPACE)


export default {
  datasetValidSubsettingTestReducer,
  datasetValidSubsettingTestActions,
}
