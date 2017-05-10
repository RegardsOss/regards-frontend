/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Datasource entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'collection']
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/collection'

const collectionReducer = DataManagementClient.CollectionReducer(REDUX_ACTION_NAMESPACE)
const collectionActions = new DataManagementClient.CollectionActions(REDUX_ACTION_NAMESPACE)
const collectionSelectors = DataManagementClient.CollectionSelectors(ENTITIES_STORE_PATH)

export default {
  collectionReducer,
  collectionActions,
  collectionSelectors,
}
