/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import getPluginsReducer from './model/PluginsReducer'

/**
 * UI-Configuration module reducers
 * @type {Function}
 * @author Sébastien Binda
 */
const uiConfigurationReducer = combineReducers({
  plugins: getPluginsReducer,
})

export default uiConfigurationReducer
