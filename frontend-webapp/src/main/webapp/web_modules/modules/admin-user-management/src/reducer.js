import { combineReducers } from 'redux'
import { projectUserManagementReducer } from '@regardsoss/admin-user-projectuser-management'
import { roleManagementReducer } from '@regardsoss/admin-user-role-management'
import { roleResourceAccessManagementReducer } from '@regardsoss/admin-user-role-resource-access-management'

const userManagementReducer = combineReducers({
  'project-user-management': projectUserManagementReducer,
  'role-management': roleManagementReducer,
  'role-resource-access-management': roleResourceAccessManagementReducer,
})


export default userManagementReducer
