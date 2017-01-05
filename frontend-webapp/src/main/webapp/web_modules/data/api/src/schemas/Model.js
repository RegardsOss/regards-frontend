/**
 * @author lmieulet
 */

import { Schema, arrayOf } from 'normalizr'

export const ModelConfiguration = {
  entityKey: 'id',
  normalizrKey: 'model',
}

const modelSchema = new Schema(ModelConfiguration.normalizrKey, {
  idAttribute: model =>
    model.content[ModelConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  MODEL: modelSchema,
  MODEL_ARRAY: arrayOf(modelSchema),
}
