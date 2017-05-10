import { combineReducers } from 'redux'
import { resourceAccessReducers } from './client/ResourceAccessClient'
import { controllerReducers } from './client/ResourceControllerClient'
import { roleReducer } from './client/RoleClient'
import { roleResourceReducers } from './client/RoleResourceClient'
import { resourceRolesReducers } from './client/ResourceRolesClient'

const roleManagementReducer = combineReducers({
  role: roleReducer,
  'resource-access': resourceAccessReducers,
  controller: controllerReducers,
  'role-resources': roleResourceReducers,
  'resource-roles': resourceRolesReducers,
})

export default roleManagementReducer
