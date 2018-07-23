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
import { combineReducers } from 'redux'
import { accessGroupReducer } from './clients/AccessGroupClient'
import { accountPasswordReducer } from './clients/AccountPasswordClient'
import { projectUserReducer } from './clients/ProjectUserClient'
import { roleReducer } from './clients/RoleClient'
import { userGroupReducer } from './clients/UserGroupClient'
import { waitingAccessUsersEntitiesReducer } from './clients/WaitingAccessUsersEntitiesClient'
import { ProjectUserSignalReducer } from './clients/ProjectUserSignalClient'
import { projectUserSettingsReducer } from './clients/ProjectUserSettingsClient'

const projectUserManagementReducer = combineReducers({
  accessGroup: accessGroupReducer,
  accountPassword: accountPasswordReducer,
  projectUser: projectUserReducer,
  role: roleReducer,
  userGroup: userGroupReducer,
  waitingAccessUsersEntities: waitingAccessUsersEntitiesReducer,
  projectUserSignals: ProjectUserSignalReducer,
  settings: projectUserSettingsReducer,
})

export default projectUserManagementReducer
