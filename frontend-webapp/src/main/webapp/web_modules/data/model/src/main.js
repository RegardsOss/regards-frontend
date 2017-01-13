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
import Model from './dam/Model'
import Plugin from './access/Plugin'
import { PluginInfo, PluginTypes } from './access/PluginInfo'
import PluginDefinition from './access/PluginDefinition'
import PluginConf from './access/PluginConf'
import AccessProject from './access/Project'
import Entity from './catalog/Entity'

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
  Model,

  // CATALOG
  Entity,

  // ACCESS
  Plugin,
  PluginDefinition,
  PluginInfo,
  PluginTypes,
  PluginConf,
  AccessProject,
}
