import PluginComponent, {PluginComponent as PluginComponentUnconnected} from "./PluginComponent"
import PluginReducer from "./PluginReducers"
import {fetchPlugins, pluginInitialized, intializePlugin} from "./PluginsActions"
import {PluginsStore, PluginType} from "./PluginInterfaces"
const PluginActions = {
    fetchPlugins, pluginInitialized, intializePlugin
}

export {PluginComponent, PluginComponentUnconnected, PluginReducer, PluginActions, PluginsStore, PluginType}
