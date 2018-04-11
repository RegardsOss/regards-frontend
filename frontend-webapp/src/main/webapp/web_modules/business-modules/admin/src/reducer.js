/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { userManagementReducer } from '@regardsoss/admin-user-management'
import { projectManagementReducer } from '@regardsoss/admin-project-management'
import { accountManagementReducer } from '@regardsoss/admin-account-management'
import { uiManagementReducer } from '@regardsoss/admin-ui-management'
import { microserviceManagementReducer } from '@regardsoss/admin-microservice-management'
import { accessRightManagementReducer } from '@regardsoss/admin-accessright-management'
import { acquisitionReducers } from '@regardsoss/admin-board-acquisition'
import { collectionsReducers } from '@regardsoss/admin-board-collections'
import { modelsReducers } from '@regardsoss/admin-board-models'

import { waitingAccessUsersEntitiesReducer } from './clients/WaitingAccessUsersEntitiesClient'

/**
 * Redux store reducers for the administration application
 * @type {Function}
 */
const adminReducer = combineReducers({
  // this reducers
  'notifications-waiting-users': waitingAccessUsersEntitiesReducer,
  // sub modules reducers
  'account-management': accountManagementReducer,
  'microservice-management': microserviceManagementReducer,
  'project-management': projectManagementReducer,
  ui: uiManagementReducer,
  'user-management': userManagementReducer,
  'access-right-management': accessRightManagementReducer,
  acquisition: acquisitionReducers,
  collections: collectionsReducers,
  models: modelsReducers,
})

export default adminReducer
