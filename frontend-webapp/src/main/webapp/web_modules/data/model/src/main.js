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
import Connection from './dam/Connection'
import Dataset from './dam/Dataset'
import Datasource from './dam/Datasource'
import ModelAttribute from './dam/ModelAttribute'
import Plugin from './access/Plugin'
import { PluginInfo } from './access/PluginInfo'
import PluginDefinition from './access/PluginDefinition'
import PluginConf from './access/PluginConf'
import AccessProject from './access/Project'
import Module from './access/Module'
import Layout from './access/Layout'
import LayoutContent from './access/LayoutContent'
import Container from './access/Container'
import AttributeConfiguration from './access/AttributeConfiguration'
import AttributesRegroupementConfiguration from './access/AttributesRegroupementConfiguration'
import SearchResultsTargetsEnum from './access/SearchResultsTargetsEnum'
import Entity from './dam/Entity'
import AccessGroup from './dam/AccessGroup'
import AccessRight from './dam/AccessRight'
import CatalogEntity from './catalog/Entity'
import { ObjectLinkedFile, ObjectLinkedFileTypes } from './catalog/ObjectLinkedFile'
import PluginMetaData, { PluginMetaDataList } from './admin/plugin/PluginMetaData'
import PluginConfiguration, { PluginConfigurationList } from './admin/plugin/PluginConfiguration'
import PluginParameter from './admin/plugin/PluginParameter'
import PluginParameterType from './admin/plugin/PluginParameterType'
import PluginDynamicValue, { PluginDynamicValueList } from './admin/plugin/PluginDynamicValue'
import Endpoint from './admin/Endpoint'
import AIPStatus, { aipStates, aipDataTypes } from './archival-storage/AIPStatus'
import StoragePlugin, { StoragePluginShape } from './archival-storage/StoragePlugin'
import Theme from './access/Theme'
import URL, { validURLRegexp, relativeURLRegexp } from './common/URL'
import RangedNumber from './common/RangedNumber'
import Percent from './common/Percent'

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
  Connection,
  Dataset,
  Datasource,
  AccessGroup,
  AccessRight,

  // CATALOG
  CatalogEntity,
  ObjectLinkedFile,
  ObjectLinkedFileTypes,

  // ACCESS
  Plugin,
  PluginDefinition,
  PluginInfo,
  PluginConf,
  AccessProject,
  Module,
  Layout,
  Container,
  LayoutContent,
  AttributeConfiguration,
  AttributesRegroupementConfiguration,
  SearchResultsTargetsEnum,

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

  // Theme
  ...Theme,

  // Common
  URL,
  validURLRegexp,
  relativeURLRegexp,
  RangedNumber,
  Percent,
}
