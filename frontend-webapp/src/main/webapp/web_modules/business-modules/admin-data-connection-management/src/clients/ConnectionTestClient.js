/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model entities client.
 *
 * @author Léo Mieulet
 */
const REDUX_ACTION_NAMESPACE = 'admin-data-connection-management/test-connection'

const connectionTestReducer = DataManagementClient.ConnectionTestReducer(REDUX_ACTION_NAMESPACE)
const connectionTestActions = new DataManagementClient.ConnectionTestActions(REDUX_ACTION_NAMESPACE)


export default {
  connectionTestReducer,
  connectionTestActions,
}
