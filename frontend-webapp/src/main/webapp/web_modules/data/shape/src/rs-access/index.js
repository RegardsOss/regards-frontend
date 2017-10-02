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
import { LinkUIPluginDataset, LinkUIPluginDatasetList } from './UIPlugin/LinkUIPluginDataset'
import { UIPluginInstanceContent } from './UIPlugin/UIPluginInstanceContent'
import { UIPluginDefinitionContent, UIPluginDefinition, UIPluginDefinitionList } from './UIPlugin/UIPluginDefinition'
import { UIPluginInfoContent } from './UIPlugin/UIPluginInfoContent'
import { UIPluginConfContent, UIPluginConf, UIPluginConfList, UIPluginConfArray } from './UIPlugin/UIPluginConf'
import RuntimeConfiguration from './UIPlugin/RuntimeConfiguration'
import RuntimeTarget from './UIPlugin/RuntimeTarget'

import { AttributeConfigurationContent, AttributeConfigurationArray } from './AttributeConfigurationContent'
import { AttributesGroupConfigurationContent, AttributesGroupConfigurationArray } from './AttributesGroupConfigurationContent'
import ContainerContent from './ContainerContent'
import { Layout, LayoutContent, LayoutList } from './Layout'
import { Module, ModuleList, ModuleArray } from './Module'
import { Project, ProjectList, ProjectArray } from './Project'
import { ThemeContent, Theme, ThemeList } from './Theme'

import PluginServiceDefinitions from './PluginService'
import { EntityWithServices } from './EntityWithServices'

export default {
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

  AttributeConfigurationArray,
  AttributeConfigurationContent,
  AttributesGroupConfigurationContent,
  AttributesGroupConfigurationArray,

  ContainerContent,

  Layout,
  LayoutContent,
  LayoutList,

  Module,
  ModuleList,
  ModuleArray,

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
