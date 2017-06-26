/*
 * LICENSE_PLACEHOLDER
 */
import { CommonClient } from '@regardsoss/client'

/**
 * PluginConfiguration entities client.
 *
 * @author Sébastien Binda
 */
const REDUCER_PATH = 'pluginParameterConfiguration'
const ENTITIES_STORE_PATH = ['admin', 'microservice-management', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'admin-microservice-management/pluginParameterConfiguration'

const pluginConfigurationReducer = CommonClient.PluginConfigurationReducer(REDUX_ACTION_NAMESPACE)
const pluginConfigurationActions = new CommonClient.PluginConfigurationActions(REDUX_ACTION_NAMESPACE)
const pluginConfigurationSelectors = CommonClient.PluginConfigurationSelectors(ENTITIES_STORE_PATH)


export default {
  pluginConfigurationReducer,
  pluginConfigurationActions,
  pluginConfigurationSelectors,
  REDUCER_PATH,
}
