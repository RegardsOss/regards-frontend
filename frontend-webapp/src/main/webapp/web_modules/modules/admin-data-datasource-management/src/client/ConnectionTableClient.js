/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'datasource', 'connection-table']
const REDUX_ACTION_NAMESPACE = 'admin-data-datasource-management/connection-table'

const connectionTableReducer = DataManagementClient.ConnectionTableReducer(REDUX_ACTION_NAMESPACE)
const connectionTableActions = new DataManagementClient.ConnectionTableActions(REDUX_ACTION_NAMESPACE)
const connectionTableSelectors = DataManagementClient.ConnectionTableSelectors(ENTITIES_STORE_PATH)


export default {
  connectionTableReducer,
  connectionTableActions,
  connectionTableSelectors,
}
