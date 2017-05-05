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

import ProjectUserActions from './user/ProjectUserActions'
import getProjectUserReducer from './user/ProjectUserReducer'
import getProjectUserSelectors from './user/ProjectUserSelectors'

import WaitingAccessUsersEntitiesActions from './user/WaitingAccessUsersEntitiesActions'
import getWaitingAccessUsersEntitiesReducer from './user/WaitingAccessUsersEntitiesReducer'
import getWaitingAccessUsersEntitiesSelectors from './user/WaitingAccessUsersEntitiesSelectors'

import WaitingAccessUsersSignalActions from './user/WaitingAccessUsersSignalActions'
import getWaitingAccessUsersSignalReducer from './user/WaitingAccessUsersSignalReducer'
import getWaitingAccessUsersSignalSelectors from './user/WaitingAccessUsersSignalSelectors'

export default {

  BorrowRoleActions,
  getBorrowRoleReducer,
  getBorrowRoleSelectors,

  BorrowableRolesActions,
  getBorrowableRolesReducer,
  getBorrowableRolesSelectors,

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

  ProjectUserActions,
  getProjectUserReducer,
  getProjectUserSelectors,

  WaitingAccessUsersEntitiesActions,
  getWaitingAccessUsersEntitiesReducer,
  getWaitingAccessUsersEntitiesSelectors,

  WaitingAccessUsersSignalActions,
  getWaitingAccessUsersSignalReducer,
  getWaitingAccessUsersSignalSelectors,

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
