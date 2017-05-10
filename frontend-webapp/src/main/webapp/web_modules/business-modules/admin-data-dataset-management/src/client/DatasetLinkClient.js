/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Dataset link signal client.
 *
 * @author Léo Mieulet
 */
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/dataset-link'

const datasetLinkReducer = DataManagementClient.DatasetLinkReducer(REDUX_ACTION_NAMESPACE)
const datasetLinkActions = new DataManagementClient.DatasetLinkActions(REDUX_ACTION_NAMESPACE)


export default {
  datasetLinkReducer,
  datasetLinkActions,
}
