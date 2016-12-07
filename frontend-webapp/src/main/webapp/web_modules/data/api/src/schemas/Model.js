/**
 * @author lmieulet
 */

import { Schema, arrayOf } from 'normalizr'

export const ModelConfiguration = {
  entityKey: 'id',
  normalizrKey: 'models',
}

const modelSchema = new Schema(ModelConfiguration.normalizrKey, {
  idAttribute: account =>
    account.content[ModelConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  MODEL: modelSchema,
  MODEL_ARRAY: arrayOf(modelSchema),
}
