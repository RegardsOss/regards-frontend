import { Schema, arrayOf } from 'normalizr'

export const AdminPluginConfigurationSchemaConfiguration = {
  entityKey: 'id',
  normalizrKey: 'pluginConfiguration',
}

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const schema = new Schema(AdminPluginConfigurationSchemaConfiguration.normalizrKey, {
  idAttribute: entity => entity.content[AdminPluginConfigurationSchemaConfiguration.entityKey],
})

// Specify relationships between different entities
schema.define({
  parameters: Schema.PLUGIN_PARAMETER_ARRAY,
})

// Schemas for API responses.
export default {
  PLUGIN_CONFIGURATION: schema,
  PLUGIN_CONFIGURATION_ARRAY: arrayOf(schema),
}
