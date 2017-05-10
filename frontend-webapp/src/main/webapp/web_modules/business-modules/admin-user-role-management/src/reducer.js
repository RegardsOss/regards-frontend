import { combineReducers } from 'redux'
import { getRoleReducer } from './model/RoleReducers'

const roleManagementReducer = combineReducers({
  role: getRoleReducer,
})

export default roleManagementReducer
