/**
 * LICENSE_PLACEHOLDER
 **/
import ProjectUser from './admin/ProjectUser'
import Role from './admin/Role'
import Project from './admin/Project'
import Account from './admin/Account'
import AttributeModel from './dam/AttributeModel'
import JavaTypes from './dam/JavaTypes'
import Fragment from './dam/Fragment'
import Plugin from './access/Plugin'
import PluginConf from './access/PluginConf'
import AccessProject from './access/Project'
import PluginMetaData, { PluginMetaDataList } from './admin/PluginMetaData'
import PluginConfiguration, { PluginConfigurationList } from './admin/PluginConfiguration'
import PluginParameter, { PluginParameterist } from './admin/PluginParameter'
import PluginDynamicValue, { PluginDynamicValueList } from './admin/PluginDynamicValue'

export default {
  // ADMIN
  ProjectUser,
  Role,
  Project,
  Account,

  // DAM
  AttributeModel,
  JavaTypes,
  Fragment,

  // ACCESS
  Plugin,
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
