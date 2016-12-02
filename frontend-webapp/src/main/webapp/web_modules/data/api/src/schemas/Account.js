import { Schema, arrayOf } from 'normalizr'

export const AccountConfiguration = {
  entityKey: 'id',
  normalizrKey: 'accounts',
}

const accountSchema = new Schema(AccountConfiguration.normalizrKey, {
  idAttribute: account =>
     account.content[AccountConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  ACCOUNT: accountSchema,
  ACCOUNT_ARRAY: arrayOf(accountSchema),
}
