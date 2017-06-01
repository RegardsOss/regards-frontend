/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { accessGroupReducer } from './clients/AccessGroupClient'
import { accountPasswordReducer } from './clients/AccountPasswordClient'
import { projectUserReducer } from './clients/ProjectUserClient'
import { roleReducer } from './clients/RoleClient'
import { userGroupReducer } from './clients/UserGroupClient'
import { waitingAccessUsersEntitiesReducer } from './clients/WaitingAccessUsersEntitiesClient'
import { waitingAccessUsersSignalReducer } from './clients/WaitingAccessUsersSignalClient'

const projectUserManagementReducer = combineReducers({
  accessGroup: accessGroupReducer,
  accountPassword: accountPasswordReducer,
  projectUser: projectUserReducer,
  role: roleReducer,
  userGroup: userGroupReducer,
  waitingAccessUsersEntities: waitingAccessUsersEntitiesReducer,
  waitingAccessUsersSignals: waitingAccessUsersSignalReducer,
})

export default projectUserManagementReducer
