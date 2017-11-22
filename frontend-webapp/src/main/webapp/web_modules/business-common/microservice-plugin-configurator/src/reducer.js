import { combineReducers } from 'redux'
import { pluginConfigurationReducer } from './clients/PluginConfigurationClient'
import { pluginMetadataReducer } from './clients/PluginMetadataClient'


const microservicePluginConfiguratorReducers = combineReducers({
  'plugin-configuration': pluginConfigurationReducer,
  'plugin-metadata': pluginMetadataReducer,
})

export default microservicePluginConfiguratorReducers
