/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * UI Plugin Definition entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'ui-plugin-definition']
const REDUX_ACTION_NAMESPACE = 'admin-ui-service-management/ui-plugin-definition'

const uiPluginDefinitionReducer = AccessProjectClient.UIPluginDefinitionReducers(REDUX_ACTION_NAMESPACE)
const uiPluginDefinitionActions = new AccessProjectClient.UIPluginDefinitionActions(REDUX_ACTION_NAMESPACE)
const uiPluginDefinitionSelectors = AccessProjectClient.UIPluginDefinitionSelectors(ENTITIES_STORE_PATH)


export default {
  uiPluginDefinitionReducer,
  uiPluginDefinitionActions,
  uiPluginDefinitionSelectors,
}
