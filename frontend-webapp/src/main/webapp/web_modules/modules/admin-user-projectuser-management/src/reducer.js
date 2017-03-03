import { combineReducers } from 'redux'
import { getProjectUserReducer, reducerPath as projectUserReducerPath } from './model/ProjectUserReducers'
import { getWaitingAccessProjectFetchReducer, reducerPath as waitingAccessProjectUserReducerPath } from './model/WaitingAccessUsersFetchReducers'
import { getWaitingAccessProjectUpdateReducer, reducerPath as waitingAccessProjectUpdateReducerPath } from './model/WaitingAccessUsersUpdateReducers'
import { getRoleReducer, reducerPath as roleReducerPath } from './model/RoleReducers'

const projectUserManagementReducer = combineReducers({
  [projectUserReducerPath]: getProjectUserReducer,
  [waitingAccessProjectUserReducerPath]: getWaitingAccessProjectFetchReducer,
  [waitingAccessProjectUpdateReducerPath]: getWaitingAccessProjectUpdateReducer,
  [roleReducerPath]: getRoleReducer,
})


export default projectUserManagementReducer
