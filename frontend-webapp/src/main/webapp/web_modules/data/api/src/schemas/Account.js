import { Schema } from 'normalizr'

const accountSchema = new Schema('accounts', {
  idAttribute: (account) => {
    return account.accountId
  },
})

// Schemas for API responses.
export default {
  ACCOUNT_SCHEMA: accountSchema,
}
