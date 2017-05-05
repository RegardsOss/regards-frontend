/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { accessGroupReducer } from './client/AccessGroupClient'
import { projectUserReducer } from './client/ProjectUserClient'
import { roleReducer } from './client/RoleClient'
import { userGroupReducer } from './client/UserGroupClient'
import { waitingAccessUsersEntitiesReducer } from './client/WaitingAccessUsersEntitiesClient'
import { waitingAccessUsersSignalReducer } from './client/WaitingAccessUsersSignalClient'

const projectUserManagementReducer = combineReducers({
  accessGroup: accessGroupReducer,
  projectUser: projectUserReducer,
  role: roleReducer,
  userGroup: userGroupReducer,
  waitingAccessUsersEntities: waitingAccessUsersEntitiesReducer,
  waitingAccessUsersSignals: waitingAccessUsersSignalReducer,
})

export default projectUserManagementReducer
