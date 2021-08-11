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
import { combineReducers } from 'redux'
import { accountReducer } from './clients/AccountClient'
import { accountWaitingReducer } from './clients/AccountWaitingClient'
import { acceptAccountReducer } from './clients/AcceptAccountClient'
import { enableAccountReducer } from './clients/EnableAccountClient'
import { refuseAccountReducer } from './clients/RefuseAccountClient'
import { accountSettingsReducer } from './clients/AccountSettingsClient'
import { accountTableReducer } from './clients/AccountTableClient'
import { originReducer } from './clients/OriginsClient'
import { projectReducer } from './clients/ProjectsClient'

const accountManagementReducer = combineReducers({
  account: accountReducer,
  waitingAccount: accountWaitingReducer,
  acceptAccount: acceptAccountReducer,
  enableAccount: enableAccountReducer,
  refuseAccount: refuseAccountReducer,
  settings: accountSettingsReducer,
  accountsTable: accountTableReducer,
  origins: originReducer,
  projects: projectReducer,
})

export default accountManagementReducer
