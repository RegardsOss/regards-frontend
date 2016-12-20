

import { Schema, arrayOf } from 'normalizr'

export const AttributeModelRestrictionConfiguration = {
  entityKey: 'id',
  normalizrKey: 'attributemodelrestriction',
}

const attributeModel = new Schema(AttributeModelRestrictionConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[AttributeModelRestrictionConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  ATTRIBUTE_MODEL_RESTRICTION: attributeModel,
  ATTRIBUTE_MODEL_RESTRICTION_ARRAY: arrayOf(attributeModel),
}
