/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { pluginConfigurationReducer } from './clients/PluginConfigurationClient'
import { pluginTypeReducer } from './clients/PluginTypeClient'
import { pluginMetaDataReducer } from './clients/PluginMetadataClient'
import { clearPluginCacheReducer } from './clients/ClearPluginCacheClient'
import MaintenanceModeReducers from './model/MaintenanceModeReducers'
import SetMaintenanceReducers from './model/SetMaintenanceModeReducers'
import { microserviceInfoActions } from './clients/MicroserviceInfoClient'
import { MicroserviceConfBackupStatusReducer } from './clients/MicroserviceConfBackupStatusClient'
import { microserviceConfBackupReducer } from './clients/MicroserviceConfBackupClient'

const maintenanceReducers = {}
const confBackupReducers = {}
forEach(STATIC_CONF.MSERVICES, (microservice) => {
  maintenanceReducers[`maintenance-${microservice}`] = MaintenanceModeReducers(microservice)
  maintenanceReducers[`set-maintenance-${microservice}`] = SetMaintenanceReducers(microservice)
  confBackupReducers[`conf-backup-${microservice}`] = MicroserviceConfBackupStatusReducer(microservice)
})

const microserviceManagementReducer = combineReducers({
  pluginMetadata: pluginMetaDataReducer,
  pluginType: pluginTypeReducer,
  pluginConfiguration: pluginConfigurationReducer,
  microserviceInfo: microserviceInfoActions,
  clearCache: clearPluginCacheReducer,
  microserviceConfBackup: microserviceConfBackupReducer,
  ...maintenanceReducers,
  ...confBackupReducers,
})

export default microserviceManagementReducer
