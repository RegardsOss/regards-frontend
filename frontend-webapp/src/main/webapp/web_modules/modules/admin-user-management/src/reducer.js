import { combineReducers } from 'redux'
import { projectUserManagementReducer } from '@regardsoss/admin-user-projectuser-management'
import { roleManagementReducer } from '@regardsoss/admin-user-role-management'

const userManagementReducer = combineReducers({
  'project-user': projectUserManagementReducer,
  role: roleManagementReducer,
})


export default userManagementReducer
