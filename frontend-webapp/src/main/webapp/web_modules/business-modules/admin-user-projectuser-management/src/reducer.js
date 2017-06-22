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
import { ProjectUserSignalReducer } from './clients/ProjectUserSignalClient'

const projectUserManagementReducer = combineReducers({
  accessGroup: accessGroupReducer,
  accountPassword: accountPasswordReducer,
  projectUser: projectUserReducer,
  role: roleReducer,
  userGroup: userGroupReducer,
  waitingAccessUsersEntities: waitingAccessUsersEntitiesReducer,
  projectUserSignals: ProjectUserSignalReducer,
})

export default projectUserManagementReducer
