

import { Schema, arrayOf } from 'normalizr'

const AccessRightConfiguration = {
  entityKey: 'id',
  normalizrKey: 'accessright',
}

const accessRight = new Schema(AccessRightConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[AccessRightConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  ACCESS_RIGHT: accessRight,
  ACCESS_RIGHT_ARRAY: arrayOf(accessRight),
  AccessRightConfiguration,
}
