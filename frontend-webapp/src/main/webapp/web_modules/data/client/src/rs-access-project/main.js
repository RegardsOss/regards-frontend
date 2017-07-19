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
import ModuleActions from './module/ModuleActions'
import ModuleReducers from './module/ModuleReducers'
import ModuleSelectors from './module/ModuleSelectors'

import LayoutActions from './layout/LayoutActions'
import LayoutReducers from './layout/LayoutReducers'
import LayoutSelectors from './layout/LayoutSelectors'

import PluginServiceActions from './pluginServices/PluginServiceActions'
import getPluginServiceReducer from './pluginServices/PluginServiceReducer'
import getPluginServiceSelectors from './pluginServices/PluginServiceSelectors'

import ThemeActions from './theme/ThemeActions'
import ThemeReducers from './theme/ThemeReducers'
import ThemeSelectors from './theme/ThemeSelectors'

import UIPluginDefinitionActions from './uiPluginDefinition/UIPluginDefinitionActions'
import UIPluginDefinitionReducers from './uiPluginDefinition/UIPluginDefinitionReducers'
import UIPluginDefinitionSelectors from './uiPluginDefinition/UIPluginDefinitionSelectors'

import UIPluginConfigurationActions from './uiPluginConfiguration/UIPluginConfigurationActions'
import UIPluginConfigurationReducers from './uiPluginConfiguration/UIPluginConfigurationReducers'
import UIPluginConfigurationSelectors from './uiPluginConfiguration/UIPluginConfigurationSelectors'


import LinkUIPluginDatasetActions from './linkUIPluginDataset/LinkUIPluginDatasetActions'
import getLinkUIPluginDatasetReducer from './linkUIPluginDataset/LinkUIPluginDatasetReducer'
import getLinkUIPluginDatasetSelectors from './linkUIPluginDataset/LinkUIPluginDatasetSelectors'

export default {

  ModuleActions,
  ModuleReducers,
  ModuleSelectors,

  LayoutActions,
  LayoutReducers,
  LayoutSelectors,

  ThemeActions,
  ThemeReducers,
  ThemeSelectors,

  PluginServiceActions,
  getPluginServiceReducer,
  getPluginServiceSelectors,

  UIPluginDefinitionActions,
  UIPluginDefinitionReducers,
  UIPluginDefinitionSelectors,

  UIPluginConfigurationActions,
  UIPluginConfigurationReducers,
  UIPluginConfigurationSelectors,


  LinkUIPluginDatasetActions,
  getLinkUIPluginDatasetReducer,
  getLinkUIPluginDatasetSelectors,
}
