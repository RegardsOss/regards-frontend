import { combineReducers } from 'redux'
import { userManagementReducer } from '@regardsoss/admin-user-management'
import { dataManagementReducer } from '@regardsoss/admin-data-management'
import { projectManagementReducer } from '@regardsoss/admin-project-management'
import { accountManagementReducer } from '@regardsoss/admin-account-management'

const adminReducer = combineReducers({
  'user-management': userManagementReducer,
  'data-management': dataManagementReducer,
  'project-management': projectManagementReducer,
  'account-management': accountManagementReducer,
})

export default adminReducer
