/**
 * LICENSE_PLACEHOLDER
 **/
import { ModulesReducers } from '@regardsoss/modules'
import { combineReducers } from 'redux'
import { userManagementReducer } from '@regardsoss/admin-user-management'
import { dataManagementReducer } from '@regardsoss/admin-data-management'
import { projectManagementReducer } from '@regardsoss/admin-project-management'
import { accountManagementReducer } from '@regardsoss/admin-account-management'
import { databaseManagementReducer } from '@regardsoss/admin-database-management'
import { uiConfigurationtReducer } from '@regardsoss/ui-configuration'

/**
 * Redux store reducers for the administration application
 * @type {Function}
 */
const adminReducer = combineReducers({
  'user-management': userManagementReducer,
  'data-management': dataManagementReducer,
  'project-management': projectManagementReducer,
  'account-management': accountManagementReducer,
  'database-management': databaseManagementReducer,
  'ui-configuration': uiConfigurationtReducer,
  modules: ModulesReducers,
})

export default adminReducer
