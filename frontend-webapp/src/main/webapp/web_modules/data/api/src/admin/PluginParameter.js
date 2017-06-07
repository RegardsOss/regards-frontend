/**
 * LICENSE_PLACEHOLDER
 **/
import { Schema, arrayOf } from 'normalizr'

const PluginParameterConfiguration = {
  entityKey: 'name',
  normalizrKey: 'pluginParameter',
}

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const schema = new Schema(PluginParameterConfiguration.normalizrKey, {
  idAttribute: entity => entity.content[PluginParameterConfiguration.entityKey],
})

// Schemas for API responses.
export default {
  PLUGIN_PARAMETER: schema,
  PLUGIN_PARAMETER_ARRAY: arrayOf(schema),
  PluginParameterConfiguration,
}
