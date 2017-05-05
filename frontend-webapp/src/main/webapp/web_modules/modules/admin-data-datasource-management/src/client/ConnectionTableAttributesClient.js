/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'datasource', 'connection-table-attributes']
const REDUX_ACTION_NAMESPACE = 'admin-data-datasource-management/connection-table-attributes'

const connectionTableAttributesReducer = DataManagementClient.ConnectionTableAttributesReducer(REDUX_ACTION_NAMESPACE)
const connectionTableAttributesActions = new DataManagementClient.ConnectionTableAttributesActions(REDUX_ACTION_NAMESPACE)
const connectionTableAttributesSelectors = DataManagementClient.ConnectionTableAttributesSelectors(ENTITIES_STORE_PATH)


export default {
  connectionTableAttributesReducer,
  connectionTableAttributesActions,
  connectionTableAttributesSelectors,
}
