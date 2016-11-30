import { arrayOf } from 'normalizr'
import Role from './Role'
import Account from './Account'
import ProjectAccount from './ProjectAccount'

const PROJECT_ACCOUNT_SCHEMA = ProjectAccount.PROJECT_ACCOUNT_SCHEMA
const ACCOUNT = Account.ACCOUNT
PROJECT_ACCOUNT_SCHEMA.define({
  role: Role.ROLE_SCHEMA,
  account: ACCOUNT,
})

const PROJECT_ACCOUNT_SCHEMA_ARRAY = arrayOf(PROJECT_ACCOUNT_SCHEMA)
ACCOUNT_SCHEMA.define({
  projectAccounts: PROJECT_ACCOUNT_SCHEMA_ARRAY,
})


export default {
  ACCOUNT,
  ACCOUNT_ARRAY: arrayOf(ACCOUNT),
  PROJECT_ACCOUNT_SCHEMA,
  PROJECT_ACCOUNT_SCHEMA_ARRAY,
}
