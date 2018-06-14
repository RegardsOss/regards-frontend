/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LinkUIPluginDataset, LinkUIPluginDatasetList } from './UIPlugin/LinkUIPluginDataset'
import { UIPluginInstanceContent } from './UIPlugin/UIPluginInstanceContent'
import { UIPluginDefinitionContent, UIPluginDefinition, UIPluginDefinitionList } from './UIPlugin/UIPluginDefinition'
import { UIPluginInfoContent } from './UIPlugin/UIPluginInfoContent'
import { UIPluginConfContent, UIPluginConf, UIPluginConfList, UIPluginConfArray } from './UIPlugin/UIPluginConf'
import RuntimeConfiguration from './UIPlugin/RuntimeConfiguration'
import RuntimeTarget from './UIPlugin/RuntimeTarget'


import { AttributeConfigurationData, AttributeElementModel, AttributeListConfigurationModel } from './AttributeListConfigurationModel'
import { AttributePresentationModel, AttributePresentationModelArray } from './AttributePresentationModelShape'

import ContainerContent from './ContainerContent'
import { Layout, LayoutContent, LayoutList } from './Layout'
import {
  ModuleWithoutContent, Module, ModulePage, ModuleList,
  ModuleArray, moduleAdminForm, runtimeDispayModuleFields, runtimeConfigurationModuleFields,
} from './Module'
import { Project, ProjectList, ProjectArray } from './Project'
import { ThemeContent, Theme, ThemeList } from './Theme'

import PluginServiceDefinitions from './PluginService'
import { EntityWithServices } from './EntityWithServices'

module.exports = {
  LinkUIPluginDataset,
  LinkUIPluginDatasetList,
  UIPluginInstanceContent,
  UIPluginDefinition,
  UIPluginDefinitionContent,
  UIPluginDefinitionList,
  UIPluginInfoContent,
  UIPluginConfContent,
  UIPluginConf,
  UIPluginConfList,
  UIPluginConfArray,

  AttributeConfigurationData,
  AttributeElementModel,
  AttributeListConfigurationModel,
  AttributePresentationModel,
  AttributePresentationModelArray,

  ContainerContent,

  Layout,
  LayoutContent,
  LayoutList,

  Module,
  ModulePage,
  ModuleList,
  ModuleArray,
  ModuleWithoutContent,
  moduleAdminForm,
  runtimeDispayModuleFields,
  runtimeConfigurationModuleFields,

  Project,
  ProjectList,
  ProjectArray,

  ThemeContent,
  Theme,
  ThemeList,

  ...PluginServiceDefinitions,
  ...RuntimeConfiguration,
  ...RuntimeTarget,

  EntityWithServices,
}
