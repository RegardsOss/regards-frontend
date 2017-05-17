/*
 * LICENSE_PLACEHOLDER
 */
import { CommonClient } from '@regardsoss/client'

/**
 * Plugin Configuration entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'plugin-configuration']
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/pluginConfiguration'

const pluginConfigurationReducer = CommonClient.PluginConfigurationReducer(REDUX_ACTION_NAMESPACE)
const pluginConfigurationActions = new CommonClient.PluginConfigurationActions(REDUX_ACTION_NAMESPACE)
const pluginConfigurationSelectors = CommonClient.PluginConfigurationSelectors(ENTITIES_STORE_PATH)


export default {
  pluginConfigurationReducer,
  pluginConfigurationActions,
  pluginConfigurationSelectors,
}
