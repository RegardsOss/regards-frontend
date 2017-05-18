/*
 * LICENSE_PLACEHOLDER
 */
import { CommonClient } from '@regardsoss/client'

/**
 * Plugin configuration entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'access-right-management', 'access-rights-management', 'plugin-configuration']
const REDUX_ACTION_NAMESPACE = 'admin-accessright-management/pluginConfiguration'

const pluginConfigurationReducer = CommonClient.PluginConfigurationReducer(REDUX_ACTION_NAMESPACE)
const pluginConfigurationActions = new CommonClient.PluginConfigurationActions(REDUX_ACTION_NAMESPACE)
const pluginConfigurationSelectors = CommonClient.PluginConfigurationSelectors(ENTITIES_STORE_PATH)


export default {
  pluginConfigurationReducer,
  pluginConfigurationActions,
  pluginConfigurationSelectors,
}
