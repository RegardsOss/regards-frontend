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
import PluginMetaDataActions from './pluginMetaData/PluginMetaDataActions'
import getPluginMetaDataReducer from './pluginMetaData/PluginMetaDataReducer'
import getPluginMetaDataSelectors from './pluginMetaData/PluginMetaDataSelectors'

import PluginConfigurationActions from './pluginConfiguration/PluginConfigurationActions'
import getPluginConfigurationReducer from './pluginConfiguration/PluginConfigurationReducer'
import getPluginConfigurationSelectors from './pluginConfiguration/PluginConfigurationSelectors'

import MicroserviceInfosActions from './info/MicroserviceInfosActions'
import getMicroserviceInfosReducer from './info/MicroserviceInfosReducer'
import getMicroserviceInfosSelectors from './info/MicroserviceInfosSelectors'

import PluginTypeActions from './pluginTypes/PluginTypeActions'
import getPluginTypeReducer from './pluginTypes/PluginTypeReducer'
import getPluginTypeSelectors from './pluginTypes/PluginTypeSelectors'


export default {
  PluginMetaDataActions,
  getPluginMetaDataReducer,
  getPluginMetaDataSelectors,

  PluginConfigurationActions,
  getPluginConfigurationReducer,
  getPluginConfigurationSelectors,

  MicroserviceInfosActions,
  getMicroserviceInfosReducer,
  getMicroserviceInfosSelectors,

  PluginTypeActions,
  getPluginTypeReducer,
  getPluginTypeSelectors,
}
