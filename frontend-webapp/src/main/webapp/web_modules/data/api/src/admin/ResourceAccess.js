import { Schema, arrayOf } from 'normalizr'

export const ResourceAccessConfiguration = {
  entityKey: 'id',
  normalizrKey: 'resourceaccess',
}

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const resourceAccessSchema = new Schema(ResourceAccessConfiguration.normalizrKey, {
  idAttribute: entity => entity.content[ResourceAccessConfiguration.entityKey],
})

// Schemas for API responses.
export default {
  RESOURCE_ACCESS: resourceAccessSchema,
  RESOURCE_ACCESS_ARRAY: arrayOf(resourceAccessSchema),
}
