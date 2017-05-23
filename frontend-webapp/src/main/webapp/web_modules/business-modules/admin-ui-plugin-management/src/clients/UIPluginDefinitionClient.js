/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * UI Plugin Definition entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'ui', 'plugin']
const REDUX_ACTION_NAMESPACE = 'admin-ui-plugins-management/plugins'

const uiPluginDefinitionReducers = AccessProjectClient.UIPluginDefinitionReducers(REDUX_ACTION_NAMESPACE)
const uiPluginDefinitionActions = AccessProjectClient.UIPluginDefinitionActions(REDUX_ACTION_NAMESPACE)
const uiPluginDefinitionSelectors = AccessProjectClient.UIPluginDefinitionSelectors(ENTITIES_STORE_PATH)


export default {
  uiPluginDefinitionReducers,
  uiPluginDefinitionActions,
  uiPluginDefinitionSelectors,
}
