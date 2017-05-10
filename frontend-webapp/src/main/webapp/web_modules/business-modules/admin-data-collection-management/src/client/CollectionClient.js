/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'collection', 'collection']
const REDUX_ACTION_NAMESPACE = 'admin-data-collection-management/model'

const collectionReducer = DataManagementClient.CollectionReducer(REDUX_ACTION_NAMESPACE)
const collectionActions = new DataManagementClient.CollectionActions(REDUX_ACTION_NAMESPACE)
const collectionSelectors = DataManagementClient.CollectionSelectors(ENTITIES_STORE_PATH)


export default {
  collectionReducer,
  collectionActions,
  collectionSelectors,
}
