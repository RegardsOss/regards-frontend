/**
 * LICENSE_PLACEHOLDER
 **/
import ProjectUser from './admin/ProjectUser'
import Role from './admin/Role'
import Project from './admin/Project'
import ProjectConnection from './admin/ProjectConnection'
import Account from './admin/Account'
import Resource, { ResourceList } from './admin/Resource'
import AttributeModel from './dam/AttributeModel'
import AttributeModelController from './dam/AttributeModelController'
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
import AttributeConfigurationController from './access/AttributeConfigurationController'
import AttributesRegroupementConfiguration from './access/AttributesRegroupementConfiguration'
import SearchResultsTargetsEnum from './access/SearchResultsTargetsEnum'
import Entity from './dam/Entity'
import EntityController from './dam/EntityController'
import AccessGroup from './dam/AccessGroup'
import AccessRight from './dam/AccessRight'
import CatalogEntity, { CatalogEntityTypes } from './catalog/CatalogEntity'
import { ObjectLinkedFile, ObjectLinkedFileTypes } from './catalog/ObjectLinkedFile'
import LinkPluginDataset from './catalog/LinkPluginDataset'
import PluginMetaData, { PluginMetaDataList } from './admin/plugin/PluginMetaData'
import PluginConfiguration, { PluginConfigurationList } from './admin/plugin/PluginConfiguration'
import PluginParameter from './admin/plugin/PluginParameter'
import PluginParameterType from './admin/plugin/PluginParameterType'
import PluginDynamicValue, { PluginDynamicValueList } from './admin/plugin/PluginDynamicValue'
import Endpoint from './admin/Endpoint'
import AIPStatus, { aipStates, aipDataTypes } from './archival-storage/AIPStatus'
import StoragePlugin, { StoragePluginShape } from './archival-storage/StoragePlugin'
import Theme from './access/Theme'
import { BusinessPluginConfiguration, BusinessPluginParamater } from './microservice-common/BusinessPluginConfiguration'
import getChainableTypeChecker from './common/ChainableTypeChecker'
import URL, { validURLRegexp, relativeURLRegexp } from './common/URL'
import RangedNumber from './common/RangedNumber'
import Percent from './common/Percent'
import locationShape from './common/ReactRouter'

export default {
  // ADMIN
  ProjectUser,
  Role,
  Project,
  ProjectConnection,
  Account,
  Resource,
  ResourceList,
  Endpoint,

  // DAM
  AttributeModel,
  AttributeModelController,
  Entity,
  EntityController,
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
  CatalogEntityTypes,
  ObjectLinkedFile,
  ObjectLinkedFileTypes,
  LinkPluginDataset,

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
  AttributeConfigurationController,
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

  // Microservice common
  BusinessPluginConfiguration,
  BusinessPluginParamater,

  // Common
  getChainableTypeChecker,
  URL,
  validURLRegexp,
  relativeURLRegexp,
  RangedNumber,
  Percent,
  locationShape,
}
