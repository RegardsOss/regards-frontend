/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model entities client.
 *
 * @author Léo Mieulet
 */
const REDUX_ACTION_NAMESPACE = 'admin-data-collection-management/collection-link'

const collectionLinkReducer = DataManagementClient.CollectionLinkReducer(REDUX_ACTION_NAMESPACE)
const collectionLinkActions = new DataManagementClient.CollectionLinkActions(REDUX_ACTION_NAMESPACE)


export default {
  collectionLinkReducer,
  collectionLinkActions,
}
