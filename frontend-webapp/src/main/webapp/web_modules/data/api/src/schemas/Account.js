import { Schema } from 'normalizr'

const accountSchema = new Schema('accounts', {
  idAttribute: account =>
     account.id
  ,
})

// Schemas for API responses.
export default {
  ACCOUNT_SCHEMA: accountSchema,
}
