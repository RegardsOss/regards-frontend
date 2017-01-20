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
import ModelAttribute from './dam/ModelAttribute'
import Plugin from './access/Plugin'
import { PluginInfo, PluginTypes } from './access/PluginInfo'
import PluginDefinition from './access/PluginDefinition'
import PluginConf from './access/PluginConf'
import AccessProject from './access/Project'
import Entity from './catalog/Entity'
import PluginMetaData, { PluginMetaDataList } from './admin/PluginMetaData'
import PluginConfiguration, { PluginConfigurationList } from './admin/PluginConfiguration'
import PluginParameter, { PluginParameterist } from './admin/PluginParameter'
import PluginDynamicValue, { PluginDynamicValueList } from './admin/PluginDynamicValue'
import Endpoint from './admin/Endpoint'

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
  JavaTypes,
  Fragment,
  Model,
  ModelAttribute,

  // CATALOG
  Entity,

  // ACCESS
  Plugin,
  PluginDefinition,
  PluginInfo,
  PluginTypes,
  PluginConf,
  AccessProject,

  // MICROSERVICE
  PluginMetaData,
  PluginMetaDataList,
  PluginConfiguration,
  PluginConfigurationList,
  PluginParameter,
  PluginParameterist,
  PluginDynamicValue,
  PluginDynamicValueList,

}
