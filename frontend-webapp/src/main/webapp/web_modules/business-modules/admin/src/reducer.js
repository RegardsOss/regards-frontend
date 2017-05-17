/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { userManagementReducer } from '@regardsoss/admin-user-management'
import { dataManagementReducer } from '@regardsoss/admin-data-management'
import { projectManagementReducer } from '@regardsoss/admin-project-management'
import { accountManagementReducer } from '@regardsoss/admin-account-management'
import { uiManagementReducer } from '@regardsoss/admin-ui-management'
import { microserviceManagementReducer } from '@regardsoss/admin-microservice-management'
import { accessRightManagementReducer } from '@regardsoss/admin-accessright-management'

import { waitingAccessUsersEntitiesReducer } from './client/WaitingAccessUsersEntitiesClient'

/**
 * Redux store reducers for the administration application
 * @type {Function}
 */
const adminReducer = combineReducers({
  // this reducers
  'notifications-waiting-users': waitingAccessUsersEntitiesReducer,
  // sub modules reducers
  'account-management': accountManagementReducer,
  'data-management': dataManagementReducer,
  'microservice-management': microserviceManagementReducer,
  'project-management': projectManagementReducer,
  ui: uiManagementReducer,
  'user-management': userManagementReducer,
  'access-right-management': accessRightManagementReducer,
})

export default adminReducer
