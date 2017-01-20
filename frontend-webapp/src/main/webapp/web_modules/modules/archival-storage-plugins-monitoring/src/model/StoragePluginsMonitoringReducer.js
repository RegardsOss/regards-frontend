/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { StoragePluginMonitoringConfiguration } from '@regardsoss/api'
import StorageMonitoringActions from './StoragePluginsMonitoringActions'

class StorageMonitoringPluginReducers extends BasicListReducers {
  constructor() {
    super(StoragePluginMonitoringConfiguration, StorageMonitoringActions)
  }
}

const instance = new StorageMonitoringPluginReducers()
export default (state, action) => instance.reduce(state, action)
