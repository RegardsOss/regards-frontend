import { combineReducers } from 'redux'
import pluginType from './model/PluginTypeReducers'
import pluginMetaData from './model/PluginMetaDataReducers'
import pluginConfiguration from './model/PluginConfigurationReducers'

const microserviceManagementReducer = combineReducers({
  pluginType,
  pluginMetaData,
  pluginConfiguration,
})

export default microserviceManagementReducer
