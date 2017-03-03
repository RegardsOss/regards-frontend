import { combineReducers } from 'redux'
import { getProjectUserReducer } from './model/ProjectUserReducers'
import { getRoleReducer } from './model/RoleReducers'
import { getAccessGroupReducer } from './model/AccessGroupReducers'
import { getUserGroupReducer } from './model/UserGroupReducers'

const projectUserManagementReducer = combineReducers({
  'project-user': getProjectUserReducer,
  accessgroup: getAccessGroupReducer,
  usergroup: getUserGroupReducer,
  role: getRoleReducer,
})


export default projectUserManagementReducer
