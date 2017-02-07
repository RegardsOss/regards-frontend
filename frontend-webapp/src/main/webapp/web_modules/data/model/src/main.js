/**
 * LICENSE_PLACEHOLDER
 **/
import ProjectUser from './admin/ProjectUser'
import Role from './admin/Role'
import Project from './admin/Project'
import Account from './admin/Account'
import Resource, { ResourceList } from './admin/Resource'
import AttributeModel from './dam/AttributeModel'
import JavaTypes from './dam/JavaTypes'
import Fragment from './dam/Fragment'
import Model from './dam/Model'
import Collection from './dam/Collection'
import ModelAttribute from './dam/ModelAttribute'
import Plugin from './access/Plugin'
import { PluginInfo } from './access/PluginInfo'
import PluginDefinition from './access/PluginDefinition'
import PluginConf from './access/PluginConf'
import AccessProject from './access/Project'
import Module from './access/Module'
import Layout from './access/Layout'
import LayoutContent from './access/LayoutContent'
import Entity from './dam/Entity'
import CatalogEntity from './catalog/Entity'
import PluginMetaData, { PluginMetaDataList } from './admin/plugin/PluginMetaData'
import PluginConfiguration, { PluginConfigurationList } from './admin/plugin/PluginConfiguration'
import PluginParameter from './admin/plugin/PluginParameter'
import PluginParameterType from './admin/plugin/PluginParameterType'
import PluginDynamicValue, { PluginDynamicValueList } from './admin/plugin/PluginDynamicValue'
import Endpoint from './admin/Endpoint'
import AIPStatus, { aipStates, aipDataTypes } from './archival-storage/AIPStatus'
import StoragePlugin, { StoragePluginShape } from './archival-storage/StoragePlugin'

export default {
  // ADMIN
  ProjectUser,
  Role,
  Project,
  Account,
  Resource,
  ResourceList,
  Endpoint,

  // DAM
  AttributeModel,
  Entity,
  JavaTypes,
  Fragment,
  Model,
  ModelAttribute,
  Collection,

  // CATALOG
  CatalogEntity,

  // ACCESS
  Plugin,
  PluginDefinition,
  PluginInfo,
  PluginConf,
  AccessProject,
  Module,
  Layout,
  LayoutContent,

  // MICROSERVICE
  PluginMetaData,
  PluginMetaDataList,
  PluginConfiguration,
  PluginConfigurationList,
  PluginParameter,
  PluginParameterType,
  PluginDynamicValue,
  PluginDynamicValueList,

  // Archival storage
  AIPStatus,
  aipStates,
  aipDataTypes,
  StoragePlugin,
  StoragePluginShape,
}
