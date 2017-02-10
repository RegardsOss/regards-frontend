

import { Schema, arrayOf } from 'normalizr'

const AccessGroupConfiguration = {
  entityKey: 'name',
  normalizrKey: 'accessgroup',
}

const accessGroup = new Schema(AccessGroupConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[AccessGroupConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  ACCESS_GROUP: accessGroup,
  ACCESS_GROUP_ARRAY: arrayOf(accessGroup),
  AccessGroupConfiguration,
}
