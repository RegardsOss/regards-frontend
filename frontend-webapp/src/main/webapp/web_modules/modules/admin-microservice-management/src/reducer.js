import { combineReducers } from 'redux'
import getPluginMetaDataReducer from './model/PluginMetaDataReducers'
import getPluginConfigurationReducers from './model/PluginConfigurationReducers'

const microserviceManagementReducer = combineReducers({
  pluginMetaData: getPluginMetaDataReducer,
  pluginConfiguration: getPluginConfigurationReducers,
})

export default microserviceManagementReducer
