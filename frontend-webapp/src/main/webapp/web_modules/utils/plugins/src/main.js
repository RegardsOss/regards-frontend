//import PluginComponent, { PluginComponent as PluginComponentUnconnected } from './PluginComponent'
import PluginComponent from './components/PluginComponent'
import PluginReducer from './PluginReducers'
import { fetchPlugins, pluginInitialized, intializePlugin } from './PluginsActions'

const PluginActions = {
  fetchPlugins, pluginInitialized, intializePlugin,
}

export { PluginComponent, PluginReducer, PluginActions }
