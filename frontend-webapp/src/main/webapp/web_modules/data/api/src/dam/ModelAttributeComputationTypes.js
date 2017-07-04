import { Schema, arrayOf } from 'normalizr'

const ModelAttributeComputationTypesConfiguration = {
  entityKey: 'attrType',
  normalizrKey: 'modelattributecomputationtypes',
}

const modelAttributeComputationTypes = new Schema(ModelAttributeComputationTypesConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[ModelAttributeComputationTypesConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  MODEL_ATTRIBUTE_COMPUTATION_TYPES: modelAttributeComputationTypes,
  MODEL_ATTRIBUTE_COMPUTATION_TYPES_ARRAY: arrayOf(modelAttributeComputationTypes),
  ModelAttributeComputationTypesConfiguration,
}
