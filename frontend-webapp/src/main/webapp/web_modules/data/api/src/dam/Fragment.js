import { Schema, arrayOf } from 'normalizr'

export const FragmentConfiguration = {
  entityKey: 'id',
  normalizrKey: 'fragment',
}

const fragmentModel = new Schema(FragmentConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[FragmentConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  FRAGMENT: fragmentModel,
  FRAGMENT_ARRAY: arrayOf(fragmentModel),
}
