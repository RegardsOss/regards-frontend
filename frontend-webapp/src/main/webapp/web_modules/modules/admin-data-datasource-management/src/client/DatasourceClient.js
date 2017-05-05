/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Datasource entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'datasource', 'datasource']
const REDUX_ACTION_NAMESPACE = 'admin-data-datasource-management/datasource'

const datasourceReducer = DataManagementClient.DatasourceReducer(REDUX_ACTION_NAMESPACE)
const datasourceActions = new DataManagementClient.DatasourceActions(REDUX_ACTION_NAMESPACE)
const datasourceSelectors = DataManagementClient.DatasourceSelectors(ENTITIES_STORE_PATH)


export default {
  datasourceReducer,
  datasourceActions,
  datasourceSelectors,
}
