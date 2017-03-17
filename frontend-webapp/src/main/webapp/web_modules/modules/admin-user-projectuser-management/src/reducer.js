/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { getProjectUserReducer, reducerPath as projectUserReducerPath } from './model/ProjectUserReducers'
import { getRoleReducer, reducerPath as roleReducerPath } from './model/RoleReducers'
import { getAccessGroupReducer, reducerPath as accessGroupReducerPath } from './model/AccessGroupReducers'
import { getUserGroupReducer, reducerPath as userGroupReducerPath } from './model/UserGroupReducers'
import { getWaitingAccessProjectEntitiesReducer, reducerPath as waitingAccessProjectUserReducerPath } from './model/WaitingAccessUsersEntitiesReducers'
import { getWaitingAccessProjectSignalReducer, reducerPath as waitingAccessProjectSignalReducerPath } from './model/WaitingAccessUsersSignalReducers'

const projectUserManagementReducer = combineReducers({
  [projectUserReducerPath]: getProjectUserReducer,
  [waitingAccessProjectUserReducerPath]: getWaitingAccessProjectEntitiesReducer,
  [waitingAccessProjectSignalReducerPath]: getWaitingAccessProjectSignalReducer,
  [roleReducerPath]: getRoleReducer,
  [accessGroupReducerPath]: getAccessGroupReducer,
  [userGroupReducerPath]: getUserGroupReducer,
})

export default projectUserManagementReducer
