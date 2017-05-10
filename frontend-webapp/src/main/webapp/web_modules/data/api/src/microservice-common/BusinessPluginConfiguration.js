

import { Schema, arrayOf } from 'normalizr'

export const BusinessPluginConfigurationConfiguration = {
  entityKey: 'id',
  normalizrKey: 'businessPluginConfiguration',
}


const entitySchema = new Schema(BusinessPluginConfigurationConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[BusinessPluginConfigurationConfiguration.entityKey],
})

// Schemas for API responses.
export default {
  BUSINESS_PLUGIN_CONFIGURATION: entitySchema,
  BUSINESS_PLUGIN_CONFIGURATION_ARRAY: arrayOf(entitySchema),
  BusinessPluginConfigurationConfiguration,
}
