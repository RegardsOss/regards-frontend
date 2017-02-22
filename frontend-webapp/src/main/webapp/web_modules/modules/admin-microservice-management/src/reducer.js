import { combineReducers } from 'redux'
import pluginType from './model/plugin/PluginTypeReducers'
import pluginMetaData from './model/plugin/PluginMetaDataReducers'
import pluginConfiguration from './model/plugin/PluginConfigurationReducers'
import MaintenanceModeReducers from './model/MaintenanceModeReducers'
import SetMaintenanceReducers from './model/SetMaintenanceModeReducers'
import microservices from './data/microservices.json'

const reducers = {}
microservices.forEach((microservice) => {
  reducers[`maintenance-${microservice.name}`] = MaintenanceModeReducers(microservice.name)
  reducers[`set-maintenance-${microservice.name}`] = SetMaintenanceReducers(microservice.name)
})

const microserviceManagementReducer = combineReducers({
  pluginType,
  pluginMetaData,
  pluginConfiguration,
  ...reducers,
})

export default microserviceManagementReducer
