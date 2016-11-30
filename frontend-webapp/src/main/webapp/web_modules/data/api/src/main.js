import Account from './schemas/Account'
import Project from './schemas/Project'
// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Schemas for API responses.
export default {
  ACCOUNT: Account.ACCOUNT,
  ACCOUNT_ARRAY: Account.ACCOUNT_ARRAY,

  PROJECT: Project.PROJECT,
  PROJECT_ARRAY: Project.PROJECT_ARRAY,
}
