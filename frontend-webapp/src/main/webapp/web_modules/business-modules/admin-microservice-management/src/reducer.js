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
import forEach from 'lodash/forEach'
import { combineReducers } from 'redux'
import pluginType from './model/plugin/PluginTypeReducers'
import pluginMetaData from './model/plugin/PluginMetaDataReducers'
import pluginConfiguration from './model/plugin/PluginConfigurationReducers'
import MaintenanceModeReducers from './model/MaintenanceModeReducers'
import SetMaintenanceReducers from './model/SetMaintenanceModeReducers'
import MicroserviceInfoClient from './clients/MicroserviceInfoClient'
import { REDUCER_PATH, pluginConfigurationReducer } from './clients/PluginConfigurationClient'

const reducers = {}
forEach(STATIC_CONF.MSERVICES, (microservice) => {
  reducers[`maintenance-${microservice}`] = MaintenanceModeReducers(microservice)
  reducers[`set-maintenance-${microservice}`] = SetMaintenanceReducers(microservice)
})

const microserviceManagementReducer = combineReducers({
  pluginType,
  pluginMetaData,
  pluginConfiguration,
  ...reducers,
  'microservice-info': MicroserviceInfoClient.microserviceInfoActions,
  [REDUCER_PATH]: pluginConfigurationReducer,
})

export default microserviceManagementReducer
