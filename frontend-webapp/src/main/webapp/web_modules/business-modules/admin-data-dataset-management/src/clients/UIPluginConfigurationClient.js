/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * UI Plugin Configuration entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'ui-plugin-configuration']
const REDUX_ACTION_NAMESPACE = 'admin-ui-service-management/plugin-configuration'
const isRequestingByUIPlugin = false

const uiPluginConfigurationReducer = AccessProjectClient.UIPluginConfigurationReducers(REDUX_ACTION_NAMESPACE)
const uiPluginConfigurationActions = new AccessProjectClient.UIPluginConfigurationActions(REDUX_ACTION_NAMESPACE, isRequestingByUIPlugin)
const uiPluginConfigurationSelectors = AccessProjectClient.UIPluginConfigurationSelectors(ENTITIES_STORE_PATH)


export default {
  uiPluginConfigurationReducer,
  uiPluginConfigurationActions,
  uiPluginConfigurationSelectors,
}
