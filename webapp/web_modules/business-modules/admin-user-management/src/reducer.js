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
import { projectUserManagementReducer } from '@regardsoss/admin-user-projectuser-management'
import { roleManagementReducer } from '@regardsoss/admin-user-role-management'
import { roleResourceAccessManagementReducer } from '@regardsoss/admin-user-role-resource-access-management'
import { orderReducer } from '@regardsoss/admin-order-management'
import { authenticationPluginManagementReducer } from '@regardsoss/admin-user-authentication-plugins-management'

const userManagementReducer = combineReducers({
  'project-user-management': projectUserManagementReducer,
  'role-management': roleManagementReducer,
  'role-resource-access-management': roleResourceAccessManagementReducer,
  'order-management': orderReducer,
  'authentication-plugins': authenticationPluginManagementReducer,
})

export default userManagementReducer
