import { Schema, arrayOf } from 'normalizr'

export const EntityConfiguration = {
  entityKey: 'id',
  normalizrKey: 'entities',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const entitySchema = new Schema(EntityConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[EntityConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  ENTITY: entitySchema,
  ENTITY_ARRAY: arrayOf(entitySchema),
}
