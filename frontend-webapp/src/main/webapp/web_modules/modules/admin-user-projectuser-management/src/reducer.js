import { combineReducers } from 'redux'
import { getProjectUserReducer } from './model/ProjectUserReducers'
import { getRoleReducer } from './model/RoleReducers'

const projectUserManagementReducer = combineReducers({
  'project-user': getProjectUserReducer,
  role: getRoleReducer,
})


export default projectUserManagementReducer
