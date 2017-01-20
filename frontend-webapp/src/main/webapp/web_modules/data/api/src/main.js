/**
 * LICENSE_PLACEHOLDER
 **/
import Account, { AccountConfiguration } from './schemas/Account'
import Project, { ProjectConfiguration } from './schemas/Project'
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
import Plugin, { PluginConfiguration } from './access/Plugin'
import Fragment, { FragmentConfiguration } from './dam/Fragment'
import Dataset, { DatasetConfiguration } from './schemas/Dataset'
import ResourceAccess, { ResourceAccessConfiguration } from './admin/ResourceAccess'
import ModelAttribute, { ModelAttributeConfiguration } from './dam/ModelAttribute'
import PluginMetaData, { PluginMetaDataConfiguration } from './admin/PluginMetaData'
import AdminPluginConfiguration, { AdminPluginConfigurationSchemaConfiguration } from './admin/PluginConfiguration'
import StorageMonitoringPlugin from './archival-storage/StoragePluginMonitoring'


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

  STORAGE_PLUGIN_MONITORING: Model.STORAGE_PLUGIN_MONITORING,
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


  MODEL_ATTRIBUTE: ModelAttribute.MODEL_ATTRIBUTE,
  MODEL_ATTRIBUTE_ARRAY: ModelAttribute.MODEL_ATTRIBUTE_ARRAY,
  ModelAttributeConfiguration,

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

  PLUGIN: Plugin.PLUGIN,
  PLUGIN_ARRAY: Plugin.PLUGIN_ARRAY,
  PluginConfiguration,

  DATASET: Dataset.DATASET,
  DATASET_ARRAY: Dataset.DATASET_ARRAY,
  DatasetConfiguration,

  RESOURCE_ACCESS: ResourceAccess.RESOURCE_ACCESS,
  RESOURCE_ACCESS_ARRAY: ResourceAccess.RESOURCE_ACCESS_ARRAY,
  ResourceAccessConfiguration,

  PLUGIN_META_DATA: PluginMetaData.PLUGIN_META_DATA,
  PLUGIN_META_DATA_ARRAY: PluginMetaData.PLUGIN_META_DATA_ARRAY,
  PluginMetaDataConfiguration,

  PLUGIN_CONFIGURATION: AdminPluginConfiguration.PLUGIN_CONFIGURATION,
  PLUGIN_CONFIGURATION_ARRAY: AdminPluginConfiguration.PLUGIN_CONFIGURATION_ARRAY,
  AdminPluginConfigurationSchemaConfiguration,
  ...StorageMonitoringPlugin,
}
