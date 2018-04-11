/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import { uiPluginDefinitionReducers } from './clients/UIPluginDefinitionClient'
import { uiPluginConfigurationReducers } from './clients/UIPluginConfigurationClient'

/**
 * Plugin service module reducers
 * @type {Function}
 * @author Léo Mieulet
 */

const serviceUIReducer = combineReducers({
  plugin: uiPluginDefinitionReducers,
  'plugin-configuration': uiPluginConfigurationReducers,
})

export default serviceUIReducer
