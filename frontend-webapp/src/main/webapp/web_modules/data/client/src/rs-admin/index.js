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
import AccountPasswordActions from './accounts/AccountPasswordActions'
import getAccountPasswordReducer from './accounts/AccountPasswordReducer'
import getAccountPasswordSelectors from './accounts/AccountPasswordSelectors'

import ProjectActions from './project/ProjectActions'
import ProjectSelectors from './project/ProjectSelectors'
import ProjectReducers from './project/ProjectReducers'

import ProjectConnectionActions from './projectConnection/ProjectConnectionActions'
import ProjectConnectionReducers from './projectConnection/ProjectConnectionReducers'
import ProjectConnectionSelectors from './projectConnection/ProjectConnectionSelectors'

import ProjectConnectionTestActions from './projectConnection/ProjectConnectionTestActions'
import ProjectConnectionTestReducers from './projectConnection/ProjectConnectionTestReducers'
import ProjectConnectionTestSelectors from './projectConnection/ProjectConnectionTestSelectors'

import ResourceActions from './resource/ResourceActions'
import ResourceReducers from './resource/ResourceReducers'
import ResourceSelectors from './resource/ResourceSelectors'

import ControllerActions from './resource/ControllerActions'
import ControllerReducers from './resource/ControllerReducers'
import ControllerSelectors from './resource/ControllerSelectors'

import ResourceAccessActions from './resource/ResourceAccessActions'
import ResourceAccessReducers from './resource/ResourceAccessReducers'
import ResourceAccessSelectors from './resource/ResourceAccessSelectors'

import BorrowRoleActions from './role/borrow/BorrowRoleActions'
import getBorrowRoleReducer from './role/borrow/BorrowRoleReducer'
import getBorrowRoleSelectors from './role/borrow/BorrowRoleSelectors'

import BorrowableRolesActions from './role/borrowable/BorrowableRolesActions'
import getBorrowableRolesReducer from './role/borrowable/BorrowableRolesReducer'
import getBorrowableRolesSelectors from './role/borrowable/BorrowableRolesSelectors'

import RoleActions from './role/RoleActions'
import getRoleReducer from './role/RoleReducer'
import getRoleSelectors from './role/RoleSelectors'

import RoleResourceActions from './role/RoleResourceActions'
import RoleResourceReducers from './role/RoleResourceReducers'
import RoleResourceSelectors from './role/RoleResourceSelectors'

import ResourceRolesActions from './role/ResourceRolesActions'
import ResourceRolesReducers from './role/ResourceRolesReducers'
import ResourceRolesSelectors from './role/ResourceRolesSelectors'

import MyUserActions from './user/MyUserActions'
import getMyUserReducer from './user/MyUserReducer'
import getMyUserSelectors from './user/MyUserSelectors'

import NotificationActions from './notification/NotificationActions'
import getNotificationReducer from './notification/NotificationReducer'
import getNotificationSelectors from './notification/NotificationSelectors'

import ProjectUserActions from './user/ProjectUserActions'
import getProjectUserReducer from './user/ProjectUserReducer'
import getProjectUserSelectors from './user/ProjectUserSelectors'

import WaitingAccessUsersEntitiesActions from './user/WaitingAccessUsersEntitiesActions'
import getWaitingAccessUsersEntitiesReducer from './user/WaitingAccessUsersEntitiesReducer'
import getWaitingAccessUsersEntitiesSelectors from './user/WaitingAccessUsersEntitiesSelectors'

import ProjectUserSignalActions from './user/ProjectUserSignalActions'
import getProjectUserSignalReducer from './user/ProjectUserSignalReducer'
import getProjectUserSignalSelectors from './user/ProjectUserSignalSelectors'

import EndpointActions from './endpoint/EndpointActions'
import getEndpointReducers from './endpoint/EndpointReducers'
import getEndpointSelectors from './endpoint/EndpointSelectors'

module.exports = {

  AccountPasswordActions,
  getAccountPasswordReducer,
  getAccountPasswordSelectors,

  BorrowRoleActions,
  getBorrowRoleReducer,
  getBorrowRoleSelectors,

  BorrowableRolesActions,
  getBorrowableRolesReducer,
  getBorrowableRolesSelectors,

  EndpointActions,
  getEndpointReducers,
  getEndpointSelectors,

  ProjectActions,
  ProjectSelectors,
  ProjectReducers,

  ProjectConnectionActions,
  ProjectConnectionReducers,
  ProjectConnectionSelectors,

  ProjectConnectionTestActions,
  ProjectConnectionTestReducers,
  ProjectConnectionTestSelectors,

  ResourceActions,
  ResourceReducers,
  ResourceSelectors,

  ControllerActions,
  ControllerReducers,
  ControllerSelectors,

  MyUserActions,
  getMyUserReducer,
  getMyUserSelectors,

  NotificationActions,
  getNotificationReducer,
  getNotificationSelectors,

  ProjectUserActions,
  getProjectUserReducer,
  getProjectUserSelectors,

  WaitingAccessUsersEntitiesActions,
  getWaitingAccessUsersEntitiesReducer,
  getWaitingAccessUsersEntitiesSelectors,

  ProjectUserSignalActions,
  getProjectUserSignalReducer,
  getProjectUserSignalSelectors,

  ResourceAccessActions,
  ResourceAccessReducers,
  ResourceAccessSelectors,

  RoleActions,
  getRoleReducer,
  getRoleSelectors,

  RoleResourceActions,
  RoleResourceReducers,
  RoleResourceSelectors,

  ResourceRolesActions,
  ResourceRolesReducers,
  ResourceRolesSelectors,

}
