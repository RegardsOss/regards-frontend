/**
 * LICENSE_PLACEHOLDER
 */
import { combineReducers } from 'redux'
import { getStoragePluginMonitoringReducer } from './model/StoragePluginMonitoringReducers'

const archivalStorageReducer = combineReducers({
  'storage-plugins-monitoring': getStoragePluginMonitoringReducer,
})

export default archivalStorageReducer

