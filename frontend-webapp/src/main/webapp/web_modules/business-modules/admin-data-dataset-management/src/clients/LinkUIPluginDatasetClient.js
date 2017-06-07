/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Datasource entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'link-plugin-dataset']
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/plugin-dataset'

const linkUIPluginDatasetReducer = AccessProjectClient.getLinkUIPluginDatasetReducer(REDUX_ACTION_NAMESPACE)
const linkUIPluginDatasetActions = new AccessProjectClient.LinkUIPluginDatasetActions(REDUX_ACTION_NAMESPACE)
const linkUIPluginDatasetSelectors = AccessProjectClient.getLinkUIPluginDatasetSelectors(ENTITIES_STORE_PATH)

export default {
  linkUIPluginDatasetReducer,
  linkUIPluginDatasetActions,
  linkUIPluginDatasetSelectors,
}
