/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * UI Plugin Configuration entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'plugin-configuration']
const REDUX_ACTION_NAMESPACE = 'admin-ui-service-management/plugin-configuration'
const isRequestingByUIPlugin = false

const uiPluginConfigurationReducers = AccessProjectClient.UIPluginConfigurationReducers(REDUX_ACTION_NAMESPACE)
const uiPluginConfigurationActions = AccessProjectClient.UIPluginConfigurationActions(REDUX_ACTION_NAMESPACE, isRequestingByUIPlugin)
const uiPluginConfigurationSelectors = AccessProjectClient.UIPluginConfigurationSelectors(ENTITIES_STORE_PATH)


export default {
  uiPluginConfigurationReducers,
  uiPluginConfigurationActions,
  uiPluginConfigurationSelectors,
}
