import { combineReducers } from 'redux'
import { getProjectUserReducer, reducerPath as projectUserReducerPath } from './model/ProjectUserReducers'
import { getWaitingAccessProjectUserReducer, reducerPath as waitingAccessProjectUserReducerPath } from './model/WaitingAccessProjectUserReducers'
import { getRoleReducer, reducerPath as roleReducerPath } from './model/RoleReducers'

const projectUserManagementReducer = combineReducers({
  [projectUserReducerPath]: getProjectUserReducer,
  [waitingAccessProjectUserReducerPath]: getWaitingAccessProjectUserReducer,
  [roleReducerPath]: getRoleReducer,
})


export default projectUserManagementReducer
