/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import { uiPluginDefinitionReducers } from './client/UIPluginDefinitionClient'
import { uiPluginConfigurationReducers } from './client/UIPluginConfigurationClient'

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
