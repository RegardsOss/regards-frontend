import { Schema } from 'normalizr'

const accountSchema = new Schema('accounts', {
  idAttribute: account =>
     account.content.id
  ,
})

// Schemas for API responses.
export default {
  ACCOUNT_SCHEMA: accountSchema,
}
