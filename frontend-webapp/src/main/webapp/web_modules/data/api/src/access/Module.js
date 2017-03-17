import { Schema, arrayOf } from 'normalizr'

export const ModuleConfiguration = {
  entityKey: 'id',
  normalizrKey: 'modules',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const moduleSchema = new Schema(ModuleConfiguration.normalizrKey, {
  idAttribute: module =>
    module.content[ModuleConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (value && value.conf) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.conf = JSON.parse(value.conf)
      } catch (e) {
        console.error(`Invalid Module configuration for module ${value.id}`)
        console.error(`Conf: ${value.conf}`)
      }
    }
  },
})

// Schemas for API responses.
export default {
  MODULE: moduleSchema,
  MODULE_ARRAY: arrayOf(moduleSchema),
}
