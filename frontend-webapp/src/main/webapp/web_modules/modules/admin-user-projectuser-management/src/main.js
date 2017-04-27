/**
 * LICENSE_PLACEHOLDER
 **/
import projectUserManagementRouter from './router'
import projectUserManagementReducer from './reducer'
import WaitingAccessUsersEntitiesActions from './model/WaitingAccessUsersEntitiesActions'
import WaitingAccessUsersEntitiesSelectors from './model/WaitingAccessUsersEntitiesSelectors'

export default {
  projectUserManagementReducer,
  projectUserManagementRouter,
  // expose module elements used externally
  WaitingAccessUsersEntitiesActions,
  WaitingAccessUsersEntitiesSelectors,
}
