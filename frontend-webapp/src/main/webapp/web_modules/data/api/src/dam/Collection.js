import { Schema, arrayOf } from 'normalizr'

const CollectionConfiguration = {
  entityKey: 'id',
  normalizrKey: 'collection',
}

const collection = new Schema(CollectionConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[CollectionConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  COLLECTION: collection,
  COLLECTION_ARRAY: arrayOf(collection),
  CollectionConfiguration,
}
