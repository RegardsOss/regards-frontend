/*
 * LICENSE_PLACEHOLDER
 */
import { CatalogClient } from '@regardsoss/client'

/**
 * Datasource entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'link-plugin-dataset']
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/link-plugin-dataset'

const linkPluginDatasetReducer = CatalogClient.getLinkPluginDatasetReducer(REDUX_ACTION_NAMESPACE)
const linkPluginDatasetActions = new CatalogClient.LinkPluginDatasetActions(REDUX_ACTION_NAMESPACE)
const linkPluginDatasetSelectors = CatalogClient.getLinkPluginDatasetSelectors(ENTITIES_STORE_PATH)

export default {
  linkPluginDatasetReducer,
  linkPluginDatasetActions,
  linkPluginDatasetSelectors,
}
