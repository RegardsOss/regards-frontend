import Account, { AccountConfiguration } from './schemas/Account'
import Project, { ProjectConfiguration } from './schemas/Project'
import ProjectUser, { ProjectUserConfiguration } from './schemas/ProjectUser'
import Role, { RoleConfiguration } from './schemas/Role'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Schemas for API responses.
export default {
  ACCOUNT: Account.ACCOUNT,
  ACCOUNT_ARRAY: Account.ACCOUNT_ARRAY,
  AccountConfiguration,

  PROJECT: Project.PROJECT,
  PROJECT_ARRAY: Project.PROJECT_ARRAY,
  ProjectConfiguration,

  PROJECT_USER: ProjectUser.PROJECT_USER,
  PROJECT_USER_ARRAY: ProjectUser.PROJECT_USER_ARRAY,
  ProjectUserConfiguration,

  ROLE: Role.ROLE,
  ROLE_ARRAY: Role.ROLE_ARRAY,
  RoleConfiguration,
}
