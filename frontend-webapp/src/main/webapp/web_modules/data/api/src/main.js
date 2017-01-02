/**
 * LICENSE_PLACEHOLDER
 **/
import Account, { AccountConfiguration } from './schemas/Account'
import Project, { ProjectConfiguration } from './schemas/Project'
import ProjectShape from './admin/ProjectShape'
import ProjectConnection, { ProjectConnectionConfiguration } from './schemas/ProjectConnection'
import ProjectUser, { ProjectUserConfiguration } from './schemas/ProjectUser'
import Role, { RoleConfiguration } from './schemas/Role'
import Model, { ModelConfiguration } from './schemas/Model'
import Accesses, { AccessesConfiguration } from './schemas/Accesses'
import AttributeModel, { AttributeModelConfiguration } from './dam/AttributeModel'
import AttributeModelRestriction, { AttributeModelRestrictionConfiguration } from './dam/AttributeModelRestriction'
import Module, { ModuleConfiguration } from './access/Module'
import Layout, { LayoutConfiguration } from './access/Layout'
import Theme, { ThemeConfiguration } from './access/Theme'
import AccessProjectShape from './access/ProjectShape'
import Fragment, { FragmentConfiguration } from './dam/Fragment'

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
  ProjectShape,
  AccessProjectShape,

  PROJECT_USER: ProjectUser.PROJECT_USER,
  PROJECT_USER_ARRAY: ProjectUser.PROJECT_USER_ARRAY,
  ProjectUserConfiguration,

  ROLE: Role.ROLE,
  ROLE_ARRAY: Role.ROLE_ARRAY,
  RoleConfiguration,

  MODEL: Model.MODEL,
  MODEL_ARRAY: Model.MODEL_ARRAY,
  ModelConfiguration,

  PROJECT_CONNECTION: ProjectConnection.PROJECT_CONNECTION,
  PROJECT_CONNECTION_ARRAY: ProjectConnection.PROJECT_CONNECTION_ARRAY,
  ProjectConnectionConfiguration,

  ACCESSES: Accesses.ACCESSES,
  ACCESSES_ARRAY: Accesses.ACCESSES_ARRAY,
  AccessesConfiguration,

  ATTRIBUTE_MODEL: AttributeModel.ATTRIBUTE_MODEL,
  ATTRIBUTE_MODEL_ARRAY: AttributeModel.ATTRIBUTE_MODEL_ARRAY,
  AttributeModelConfiguration,

  ATTRIBUTE_MODEL_RESTRICTION: AttributeModelRestriction.ATTRIBUTE_MODEL_RESTRICTION,
  ATTRIBUTE_MODEL_RESTRICTION_ARRAY: AttributeModelRestriction.ATTRIBUTE_MODEL_RESTRICTION_ARRAY,
  AttributeModelRestrictionConfiguration,

  MODULE: Module.MODULE,
  MODULE_ARRAY: Module.MODULE_ARRAY,
  ModuleConfiguration,

  FRAGMENT: Fragment.FRAGMENT,
  FRAGMENT_ARRAY: Fragment.FRAGMENT_ARRAY,
  FragmentConfiguration,

  LAYOUT: Layout.LAYOUT,
  LayoutConfiguration,

  THEME: Theme.THEME,
  ThemeConfiguration,
}
