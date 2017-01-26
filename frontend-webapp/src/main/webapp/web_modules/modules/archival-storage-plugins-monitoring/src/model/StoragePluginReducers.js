/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { StoragePluginConfiguration } from '@regardsoss/api'
import StoragePluginActions from './StoragePluginActions'

class StoragePluginReducers extends BasicListReducers {
  constructor() {
    super(StoragePluginConfiguration, StoragePluginActions)
  }
}

const instance = new StoragePluginReducers()
export default (state, action) => instance.reduce(state, action)
