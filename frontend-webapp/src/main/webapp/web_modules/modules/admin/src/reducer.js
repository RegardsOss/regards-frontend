/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { userManagementReducer } from '@regardsoss/admin-user-management'
import { dataManagementReducer } from '@regardsoss/admin-data-management'
import { projectManagementReducer } from '@regardsoss/admin-project-management'
import { accountManagementReducer } from '@regardsoss/admin-account-management'
import { databaseManagementReducer } from '@regardsoss/admin-database-management'
import { uiManagementReducer } from '@regardsoss/admin-ui-management'
import { microserviceManagementReducer } from '@regardsoss/admin-microservice-management'
import { accessRightManagementReducer } from '@regardsoss/admin-accessright-management'

/**
 * Redux store reducers for the administration application
 * @type {Function}
 */
const adminReducer = combineReducers({
  'account-management': accountManagementReducer,
  'data-management': dataManagementReducer,
  'database-management': databaseManagementReducer,
  'microservice-management': microserviceManagementReducer,
  'project-management': projectManagementReducer,
  ui: uiManagementReducer,
  'user-management': userManagementReducer,
  'access-right': accessRightManagementReducer,
})

export default adminReducer
