/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import getPluginsReducer from './model/PluginsReducer'

/**
 * UI-Configuration module reducers
 * @type {Function}
 */
const uiConfigurationReducer = combineReducers({
  plugins: getPluginsReducer,
})

export default uiConfigurationReducer
