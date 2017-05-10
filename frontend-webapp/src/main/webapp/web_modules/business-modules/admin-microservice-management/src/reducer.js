import { combineReducers } from 'redux'
import pluginType from './model/plugin/PluginTypeReducers'
import pluginMetaData from './model/plugin/PluginMetaDataReducers'
import pluginConfiguration from './model/plugin/PluginConfigurationReducers'
import MaintenanceModeReducers from './model/MaintenanceModeReducers'
import SetMaintenanceReducers from './model/SetMaintenanceModeReducers'
import MicroserviceInfoClient from './client/MicroserviceInfoClient'

const reducers = {}
STATIC_CONFIGURATION.microservices.forEach((microservice) => {
  reducers[`maintenance-${microservice}`] = MaintenanceModeReducers(microservice)
  reducers[`set-maintenance-${microservice}`] = SetMaintenanceReducers(microservice)
})

const microserviceManagementReducer = combineReducers({
  pluginType,
  pluginMetaData,
  pluginConfiguration,
  ...reducers,
  'microservice-info': MicroserviceInfoClient.microserviceInfoActions,
})

export default microserviceManagementReducer
