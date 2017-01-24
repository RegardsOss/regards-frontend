import { Schema, arrayOf } from 'normalizr'

export const PluginMetaDataConfiguration = {
  entityKey: 'pluginId',
  normalizrKey: 'pluginMetaData',
}

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const schema = new Schema(PluginMetaDataConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[PluginMetaDataConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  PLUGIN_META_DATA: schema,
  PLUGIN_META_DATA_ARRAY: arrayOf(schema),
}
