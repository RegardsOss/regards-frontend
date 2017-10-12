/**
* LICENSE_PLACEHOLDER
**/
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Defines plugin services client for results context
 */
export const REDUCER_PATH = 'pluginServices'

const ENTITIES_STORE_PATH = ['modules.search-results', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-results/plugin-services'

export const pluginServiceActions = new AccessProjectClient.PluginServiceActions(REDUX_ACTION_NAMESPACE)
export const pluginServiceReducer = AccessProjectClient.getPluginServiceReducer(REDUX_ACTION_NAMESPACE)
export const pluginServiceSelectors = AccessProjectClient.getPluginServiceSelectors(ENTITIES_STORE_PATH)

export default {
  pluginServiceActions,
  pluginServiceReducer,
  pluginServiceSelectors,
}
