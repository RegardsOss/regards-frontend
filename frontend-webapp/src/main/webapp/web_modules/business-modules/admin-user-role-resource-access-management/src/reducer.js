import { combineReducers } from 'redux'
import { resourceAccessReducers } from './clients/ResourceAccessClient'
import { controllerReducers } from './clients/ResourceControllerClient'
import { roleReducer } from './clients/RoleClient'
import { roleResourceReducers } from './clients/RoleResourceClient'
import { resourceRolesReducers } from './clients/ResourceRolesClient'

const roleManagementReducer = combineReducers({
  role: roleReducer,
  'resource-access': resourceAccessReducers,
  controller: controllerReducers,
  'role-resources': roleResourceReducers,
  'resource-roles': resourceRolesReducers,
})

export default roleManagementReducer
