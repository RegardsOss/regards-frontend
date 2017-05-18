/*
 * LICENSE_PLACEHOLDER
 */
import { CommonClient } from '@regardsoss/client'

/**
 * Plugin Metadata entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'access-right-management', 'access-rights-management', 'plugin-meta-data']
const REDUX_ACTION_NAMESPACE = 'admin-accessright-management/pluginMetaData'

const pluginMetadataReducer = CommonClient.PluginMetaDataReducer(REDUX_ACTION_NAMESPACE)
const pluginMetadataActions = new CommonClient.PluginMetaDataActions(REDUX_ACTION_NAMESPACE)
const pluginMetadataSelectors = CommonClient.PluginMetaDataSelectors(ENTITIES_STORE_PATH)


export default {
  pluginMetadataReducer,
  pluginMetadataActions,
  pluginMetadataSelectors,
}
