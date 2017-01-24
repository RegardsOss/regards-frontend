/**
 * LICENSE_PLACEHOLDER
 **/

import { Schema, arrayOf } from 'normalizr'

/**
 * StoragePluginMonitoring (spm) management for normalizer
 */
export const StoragePluginMonitoringConfiguration = {
  entityKey: 'id',
  normalizrKey: 'StorageMonitoringPlugin',
}

const storageMonitoringPluginSchema = new Schema(StoragePluginMonitoringConfiguration.normalizrKey, {
  idAttribute: model =>
    model.content[StoragePluginMonitoringConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  STORAGE_PLUGIN_MONITORING: storageMonitoringPluginSchema,
  STORAGE_PLUGIN_MONITORING_ARRAY: arrayOf(storageMonitoringPluginSchema),
  StoragePluginMonitoringConfiguration,
}
