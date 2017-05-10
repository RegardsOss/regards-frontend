/*
 * LICENSE_PLACEHOLDER
 */
import { CommonClient } from '@regardsoss/client'

/**
 * Plugin Meta Data entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'connection', 'plugin-meta-data']
const REDUX_ACTION_NAMESPACE = 'admin-data-connection-management/pluginMetaData'

const pluginMetaDataReducer = CommonClient.PluginMetaDataReducer(REDUX_ACTION_NAMESPACE)
const pluginMetaDataActions = new CommonClient.PluginMetaDataActions(REDUX_ACTION_NAMESPACE)
const pluginMetaDataSelectors = CommonClient.PluginMetaDataSelectors(ENTITIES_STORE_PATH)


export default {
  pluginMetaDataReducer,
  pluginMetaDataActions,
  pluginMetaDataSelectors,
}
