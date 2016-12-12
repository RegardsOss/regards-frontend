

import { Schema, arrayOf } from 'normalizr'

export const AttributeModelConfiguration = {
  entityKey: 'id',
  normalizrKey: 'attributemodel',
}

const attributeModel = new Schema(AttributeModelConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[AttributeModelConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  ATTRIBUTE_MODEL: attributeModel,
  ATTRIBUTE_MODEL_ARRAY: arrayOf(attributeModel),
}
