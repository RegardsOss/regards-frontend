import { Schema, arrayOf } from 'normalizr'

export const ModuleConfiguration = {
  entityKey: 'id',
  normalizrKey: 'modules',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const moduleSchema = new Schema(ModuleConfiguration.normalizrKey, {
  idAttribute: module =>
    module.content[ModuleConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  MODULE: moduleSchema,
  MODULE_ARRAY: arrayOf(moduleSchema),
}
