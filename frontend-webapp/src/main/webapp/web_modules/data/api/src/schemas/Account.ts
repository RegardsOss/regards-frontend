import { Schema } from "normalizr"
import { Account } from "@regardsoss/models"

const accountSchema = new Schema('accounts', {
  idAttribute: (account: Account) => {
    return account.accountId
  }
})

// Schemas for API responses.
export default {
  ACCOUNT_SCHEMA: accountSchema
}
