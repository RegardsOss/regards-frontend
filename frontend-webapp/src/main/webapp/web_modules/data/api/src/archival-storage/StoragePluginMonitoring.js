/**
 * LICENSE_PLACEHOLDER
 **/

import { Schema, arrayOf } from 'normalizr'

/**
 * StoragePluginMonitoring (spm) management for normalizer
 */
const StorageMonitoringPluginConfiguration = {
  entityKey: 'id', // FIXME : check with backend after implementation
  normalizrKey: 'StorageMonitoringPlugin',
}

const storageMonitoringPluginSchema = new Schema(StorageMonitoringPluginConfiguration.normalizrKey, {
  idAttribute: model =>
    model.content[StorageMonitoringPluginConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  STORAGE_MONITORING_PLUGIN: storageMonitoringPluginSchema,
  STORAGE_MONITORING_PLUGIN_ARRAY: arrayOf(storageMonitoringPluginSchema),
  StorageMonitoringPluginConfiguration,
}
