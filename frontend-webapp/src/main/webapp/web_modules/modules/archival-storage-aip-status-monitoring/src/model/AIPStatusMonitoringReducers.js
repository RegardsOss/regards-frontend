/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { StoragePluginMonitoringConfiguration } from '@regardsoss/api'
import StorageMonitoringActions from './AIPStatusMonitoringActions'

class StorageMonitoringPluginReducers extends BasicListReducers {
  constructor() {
    super(StoragePluginMonitoringConfiguration, StorageMonitoringActions)
  }
}

const instance = new StorageMonitoringPluginReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getAIPStatusMonitoringReducer(state, action) {
  return instance.reduce(state, action)
}
