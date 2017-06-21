import { Schema, arrayOf } from 'normalizr'

const CollectionConfiguration = {
  entityKey: 'id',
  normalizrKey: 'collection',
}

const collection = new Schema(CollectionConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[CollectionConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (value && value.geometry) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.geometry = JSON.stringify(value.geometry)
      } catch (e) {
        console.error(`Invalid attribute geometry for collection ${value.id}`, e)
      }
    }
  },
})

// Schemas for API responses.
export default {
  COLLECTION: collection,
  COLLECTION_ARRAY: arrayOf(collection),
  CollectionConfiguration,
}
