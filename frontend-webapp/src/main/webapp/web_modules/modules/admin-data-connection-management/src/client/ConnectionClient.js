/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * UI Plugin Configuration entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'connection', 'connection']
const REDUX_ACTION_NAMESPACE = 'admin-data-connection-management/connection'

const connectionReducer = DataManagementClient.ConnectionReducer(REDUX_ACTION_NAMESPACE)
const connectionActions = new DataManagementClient.ConnectionActions(REDUX_ACTION_NAMESPACE)
const connectionSelectors = DataManagementClient.ConnectionSelectors(ENTITIES_STORE_PATH)


export default {
  connectionReducer,
  connectionActions,
  connectionSelectors,
}
