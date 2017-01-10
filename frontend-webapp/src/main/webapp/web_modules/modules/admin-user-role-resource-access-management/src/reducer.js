import { combineReducers } from 'redux'
import { getRoleReducer } from './model/RoleReducers'
import { getResourceAccessReducer } from './model/ResourceAccessReducers'
const roleManagementReducer = combineReducers({
  role: getRoleReducer,
  'resource-access': getResourceAccessReducer,
})

export default roleManagementReducer
