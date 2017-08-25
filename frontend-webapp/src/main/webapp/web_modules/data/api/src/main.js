/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
import LinkUIPluginDataset from './access/LinkUIPluginDataset'
import Theme from './access/Theme'
import Plugin, { PluginConfiguration } from './access/Plugin'
import UIPluginConf from './access/UIPluginConf'
import Fragment, { FragmentConfiguration } from './dam/Fragment'
import Dataset, { DatasetConfiguration } from './dam/Dataset'
import AccessRight from './dam/AccessRight'
import AccessGroup from './dam/AccessGroup'
import Datasource from './dam/Datasource'
import Document from './dam/Document'
import Entity, { EntityConfiguration } from './catalog/Entity'
import ResourceAccess, { ResourceAccessConfiguration } from './admin/ResourceAccess'
import ModelAttribute, { ModelAttributeConfiguration } from './dam/ModelAttribute'
import PluginMetaData, { PluginMetaDataConfiguration } from './admin/PluginMetaData'
import AdminPluginConfiguration, { AdminPluginConfigurationSchemaConfiguration } from './admin/PluginConfiguration'
import StoragePlugin from './archival-storage/StoragePlugin'
import Collection from './dam/Collection'
import Connection from './dam/Connection'
import ModelAttributeComputationTypes from './dam/ModelAttributeComputationTypes'
import AIPStatus from './archival-storage/AIPStatus'
import Endpoint, { EndpointConfiguration } from './admin/Endpoint'
import PluginParameter from './admin/PluginParameter'
import LinkPluginDataset from './catalog/LinkPluginDataset'
import BusinessPluginConfiguration from './microservice-common/BusinessPluginConfiguration'

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

  STORAGE_PLUGIN: Model.STORAGE_PLUGIN,

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
  LAYOUT_ARRAY: Layout.LAYOUT_ARRAY,
  LayoutConfiguration,

  ...Theme,

  PLUGIN: Plugin.PLUGIN,
  PLUGIN_ARRAY: Plugin.PLUGIN_ARRAY,
  PluginConfiguration,

  ENTITY: Entity.ENTITY,
  ENTITY_ARRAY: Entity.ENTITY_ARRAY,
  EntityConfiguration,

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

  ...Collection,
  ...StoragePlugin,
  ...AIPStatus,

  ENDPOINT: Endpoint.ENDPOINT,
  ENDPOINT_ARRAY: Endpoint.ENDPOINT_ARRAY,
  EndpointConfiguration,

  ...PluginParameter,

  ...Datasource,
  ...Document,
  ...AccessRight,
  ...AccessGroup,
  ...Connection,
  ...ModelAttributeComputationTypes,

  ...LinkPluginDataset,
  ...UIPluginConf,

  ...BusinessPluginConfiguration,

  ...LinkUIPluginDataset,
}
