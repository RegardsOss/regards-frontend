/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * Combine all reducers for this aa to a single root reducer.
 */
import { combineReducers } from 'redux'
import PluginReducer from './model/PluginReducer'
import LoadPluginReducer from './model/LoadPluginReducer'

/**
 * Plugin utils reducers
 * @author Sébastien Binda
 */
export default combineReducers({
  loadedPlugins: LoadPluginReducer,
  plugins: PluginReducer,
})
