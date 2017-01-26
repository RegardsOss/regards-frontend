/**
 * LICENSE_PLACEHOLDER
 **/

import { Schema, arrayOf } from 'normalizr'

/**
 * Storage plugin management for normalizer
 */
export const StoragePluginConfiguration = {
  entityKey: 'id',
  normalizrKey: 'StorageMonitoringPlugin',
}

const storagePluginSchema = new Schema(StoragePluginConfiguration.normalizrKey, {
  idAttribute: model =>
    model.content[StoragePluginConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  STORAGE_PLUGIN: storagePluginSchema,
  STORAGE_PLUGIN_ARRAY: arrayOf(storagePluginSchema),
  StoragePluginConfiguration,
}
