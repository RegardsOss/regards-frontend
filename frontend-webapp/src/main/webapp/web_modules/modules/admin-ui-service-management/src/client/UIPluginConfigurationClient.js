/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * UI Plugin Configuration entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'ui', 'service', 'plugin-configuration']
const REDUX_ACTION_NAMESPACE = 'admin-ui-service-management/plugin-configuration'

const uiPluginConfigurationReducers = AccessProjectClient.UIPluginConfigurationReducers(REDUX_ACTION_NAMESPACE)
const uiPluginConfigurationActions = AccessProjectClient.UIPluginConfigurationActions(REDUX_ACTION_NAMESPACE)
const uiPluginConfigurationSelectors = AccessProjectClient.UIPluginConfigurationSelectors(ENTITIES_STORE_PATH)


export default {
  uiPluginConfigurationReducers,
  uiPluginConfigurationActions,
  uiPluginConfigurationSelectors,
}
