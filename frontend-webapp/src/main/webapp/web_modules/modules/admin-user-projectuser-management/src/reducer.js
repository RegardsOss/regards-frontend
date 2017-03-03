import { combineReducers } from 'redux'
import { getProjectUserReducer, reducerPath as projectUserReducerPath } from './model/ProjectUserReducers'
import { getRoleReducer, reducerPath as roleReducerPath } from './model/RoleReducers'
import { getAccessGroupReducer, reducerPath as accessGroupReducerPath } from './model/AccessGroupReducers'
import { getUserGroupReducer, reducerPath as userGroupReducerPath } from './model/UserGroupReducers'
import { getWaitingAccessProjectFetchReducer, reducerPath as waitingAccessProjectUserReducerPath } from './model/WaitingAccessUsersFetchReducers'
import { getWaitingAccessProjectUpdateReducer, reducerPath as waitingAccessProjectUpdateReducerPath } from './model/WaitingAccessUsersUpdateReducers'

const projectUserManagementReducer = combineReducers({
  [projectUserReducerPath]: getProjectUserReducer,
  [waitingAccessProjectUserReducerPath]: getWaitingAccessProjectFetchReducer,
  [waitingAccessProjectUpdateReducerPath]: getWaitingAccessProjectUpdateReducer,
  [roleReducerPath]: getRoleReducer,
  [accessGroupReducerPath]: getAccessGroupReducer,
  [userGroupReducerPath]: getUserGroupReducer,
})

export default projectUserManagementReducer
