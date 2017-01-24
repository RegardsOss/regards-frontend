import { combineReducers } from 'redux'
import { getRoleReducer } from './model/RoleReducers'
import { getResourceAccessReducer } from './model/ResourceAccessReducers'
import { getControllerReducer } from './model/ControllerReducers'

const roleManagementReducer = combineReducers({
  role: getRoleReducer,
  'resource-access': getResourceAccessReducer,
  controller: getControllerReducer,
})

export default roleManagementReducer
