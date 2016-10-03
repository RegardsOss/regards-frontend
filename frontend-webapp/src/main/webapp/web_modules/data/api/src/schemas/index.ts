import AccountAndProjectAccountSchema from "./Account_ProjectAccount"
import ProjectAdminSchema from "./ProjectAdmin"
import Project from "./Project"
// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Schemas for API responses.
export default {
  PROJECT_ACCOUNT: AccountAndProjectAccountSchema.PROJECT_ACCOUNT_SCHEMA,
  PROJECT_ACCOUNT_ARRAY: AccountAndProjectAccountSchema.PROJECT_ACCOUNT_SCHEMA_ARRAY,
  ACCOUNT: AccountAndProjectAccountSchema.ACCOUNT_SCHEMA,
  ACCOUNT_ARRAY: AccountAndProjectAccountSchema.ACCOUNT_SCHEMA_ARRAY,

  PROJECT: Project.PROJECT,
  PROJECT_ARRAY: Project.PROJECT_ARRAY,

  // TODO remove
  PROJECT_ADMIN: ProjectAdminSchema.PROJECT_ADMIN,
  PROJECT_ADMIN_ARRAY: ProjectAdminSchema.PROJECT_ADMIN_ARRAY,
}
