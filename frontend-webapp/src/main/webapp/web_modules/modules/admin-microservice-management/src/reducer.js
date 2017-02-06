import { combineReducers } from 'redux'
import pluginType from './model/plugin/PluginTypeReducers'
import pluginMetaData from './model/plugin/PluginMetaDataReducers'
import pluginConfiguration from './model/plugin/PluginConfigurationReducers'

const microserviceManagementReducer = combineReducers({
  pluginType,
  pluginMetaData,
  pluginConfiguration,
})

export default microserviceManagementReducer
