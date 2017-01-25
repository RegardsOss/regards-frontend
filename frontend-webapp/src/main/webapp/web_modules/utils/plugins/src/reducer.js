/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * Combine all reducers for this aa to a single root reducer.
 */
import { combineReducers } from 'redux'
import PluginReducer from './model/PluginReducer'
import LoadPluginReducer from './model/LoadPluginReducer'

export default combineReducers({
  loadedPlugins: LoadPluginReducer,
  plugins: PluginReducer,
})
