import { Schema, arrayOf } from 'normalizr'

export const AccessesConfiguration = {
  entityKey: 'id',
  normalizrKey: 'accesses',
}

const accessesSchema = new Schema(AccessesConfiguration.normalizrKey, {
  idAttribute: account =>
    account.content[AccessesConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  ACCESSES: accessesSchema,
  ACCESSES_ARRAY: arrayOf(accessesSchema),
}
