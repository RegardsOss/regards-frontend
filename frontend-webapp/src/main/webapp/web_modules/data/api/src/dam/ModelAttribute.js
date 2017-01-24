import { Schema, arrayOf } from 'normalizr'

export const ModelAttributeConfiguration = {
  entityKey: 'id',
  normalizrKey: 'modelattribute',
}

const modelAttribute = new Schema(ModelAttributeConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[ModelAttributeConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  MODEL_ATTRIBUTE: modelAttribute,
  MODEL_ATTRIBUTE_ARRAY: arrayOf(modelAttribute),
}
