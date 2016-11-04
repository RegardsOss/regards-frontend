import { arrayOf } from 'normalizr'
import Role from './Role'
import Account from './Account'
import ProjectAccount from './ProjectAccount'

const PROJECT_ACCOUNT_SCHEMA = ProjectAccount.PROJECT_ACCOUNT_SCHEMA
const ACCOUNT_SCHEMA = Account.ACCOUNT_SCHEMA
PROJECT_ACCOUNT_SCHEMA.define({
  role: Role.ROLE_SCHEMA,
  account: ACCOUNT_SCHEMA,
})

const PROJECT_ACCOUNT_SCHEMA_ARRAY = arrayOf(PROJECT_ACCOUNT_SCHEMA)
ACCOUNT_SCHEMA.define({
  projectAccounts: PROJECT_ACCOUNT_SCHEMA_ARRAY,
})


export default {
  ACCOUNT_SCHEMA,
  ACCOUNT_SCHEMA_ARRAY: arrayOf(ACCOUNT_SCHEMA),
  PROJECT_ACCOUNT_SCHEMA,
  PROJECT_ACCOUNT_SCHEMA_ARRAY,
}
