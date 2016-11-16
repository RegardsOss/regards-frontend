import { Schema } from 'normalizr'
import AccountSchema from './Account'

const NAME = 'projectAccounts'
const projectAccountSchema = new Schema(NAME, {
  idAttribute: projectAccount =>
     projectAccount.projectAccountId
  ,
})

projectAccountSchema.define({
  account: AccountSchema.ACCOUNT_SCHEMA,
})


// Schemas for API responses.
export default {
  PROJECT_ACCOUNT_SCHEMA: projectAccountSchema,
}
