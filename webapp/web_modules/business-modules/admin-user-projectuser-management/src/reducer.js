/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { combineReducers } from 'redux'
import { accessGroupReducer } from './clients/AccessGroupClient'
import { accountPasswordReducer } from './clients/AccountPasswordClient'
import { projectUserReducer } from './clients/ProjectUserClient'
import { roleReducer } from './clients/RoleClient'
import { projectUserSignalReducer } from './clients/ProjectUserSignalClient'
import { projectUserSettingsReducer } from './clients/ProjectUserSettingsClient'
import { uiSettingsReducer } from './clients/UISettingsClient'
import { projectUserEmailConfirmationSignalReducer } from './clients/ProjectUserEmailConfirmationClient'
import { originReducer } from './clients/OriginsClient'
import { filtersReducer } from './clients/FiltersClient'
import { csvReducer } from './clients/DownloadCSVClient'
import { projectUserFCUDReducer } from './clients/ProjectUserFCUDClient'

const projectUserManagementReducer = combineReducers({
  accessGroup: accessGroupReducer,
  accountPassword: accountPasswordReducer,
  projectUser: projectUserReducer,
  role: roleReducer,
  projectUserSignals: projectUserSignalReducer,
  settings: projectUserSettingsReducer,
  uiSettings: uiSettingsReducer,
  emailConfirmationSignal: projectUserEmailConfirmationSignalReducer,
  origins: originReducer,
  projectUserFilters: filtersReducer,
  csv: csvReducer,
  projectUserFCUD: projectUserFCUDReducer,
})

export default projectUserManagementReducer
