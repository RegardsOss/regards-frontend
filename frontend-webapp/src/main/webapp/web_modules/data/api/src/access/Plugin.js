/**
 * LICENSE_PLACEHOLDER
 **/
import { Schema, arrayOf } from 'normalizr'

export const PluginConfiguration = {
  entityKey: 'id',
  normalizrKey: 'plugins',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const pluginSchema = new Schema(PluginConfiguration.normalizrKey, {
  idAttribute: plugin =>
    plugin.content[PluginConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  PLUGIN: pluginSchema,
  PLUGIN_ARRAY: arrayOf(pluginSchema),
}
