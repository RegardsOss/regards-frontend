import { combineReducers } from 'redux'
import pluginType from './model/plugin/PluginTypeReducers'
import pluginMetaData from './model/plugin/PluginMetaDataReducers'
import pluginConfiguration from './model/plugin/PluginConfigurationReducers'
import {
  accessMaintenanceReducer,
  adminMaintenanceReducer,
  cloudMaintenanceReducer,
  damMaintenanceReducer,
  gatewayMaintenanceReducer,
} from './model/MaintenanceModeReducers'

const microserviceManagementReducer = combineReducers({
  pluginType,
  pluginMetaData,
  pluginConfiguration,
  'maintenance-rs-access': accessMaintenanceReducer,
  'maintenance-rs-admin': adminMaintenanceReducer,
  'maintenance-rs-cloud': cloudMaintenanceReducer,
  'maintenance-rs-dam': damMaintenanceReducer,
  'maintenance-rs-gateway': gatewayMaintenanceReducer,
})

export default microserviceManagementReducer
