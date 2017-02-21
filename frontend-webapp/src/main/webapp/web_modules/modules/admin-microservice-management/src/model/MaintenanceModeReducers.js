/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import {
  accessMaintenanceActions,
  adminMaintenanceActions,
  cloudMaintenanceActions,
  damMaintenanceActions,
  gatewayMaintenanceActions,
} from './MaintenanceModeActions'

const accessInstance = new BasicSignalReducers(accessMaintenanceActions)
const adminInstance = new BasicSignalReducers(adminMaintenanceActions)
const cloudInstance = new BasicSignalReducers(cloudMaintenanceActions)
const damInstance = new BasicSignalReducers(damMaintenanceActions)
const gatewayInstance = new BasicSignalReducers(gatewayMaintenanceActions)

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export const accessMaintenanceReducer = function (state, action) {
  return accessInstance.reduce(state, action)
}
export const adminMaintenanceReducer = function (state, action) {
  return adminInstance.reduce(state, action)
}
export const cloudMaintenanceReducer = function (state, action) {
  return cloudInstance.reduce(state, action)
}
export const damMaintenanceReducer = function (state, action) {
  return damInstance.reduce(state, action)
}
export const gatewayMaintenanceReducer = function (state, action) {
  return gatewayInstance.reduce(state, action)
}
