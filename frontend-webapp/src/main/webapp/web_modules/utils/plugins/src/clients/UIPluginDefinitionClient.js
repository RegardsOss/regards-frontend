/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * UI Plugin Definition entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['common', 'plugins', 'plugins']
const REDUX_ACTION_NAMESPACE = 'common/plugins'

const uiPluginDefinitionReducers = AccessProjectClient.UIPluginDefinitionReducers(REDUX_ACTION_NAMESPACE)
const uiPluginDefinitionActions = new AccessProjectClient.UIPluginDefinitionActions(REDUX_ACTION_NAMESPACE)
const uiPluginDefinitionSelectors = AccessProjectClient.UIPluginDefinitionSelectors(ENTITIES_STORE_PATH)


export default {
  uiPluginDefinitionReducers,
  uiPluginDefinitionActions,
  uiPluginDefinitionSelectors,
}
