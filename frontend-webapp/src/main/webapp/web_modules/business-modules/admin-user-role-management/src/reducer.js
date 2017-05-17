import { combineReducers } from 'redux'
import { roleReducer } from './clients/RoleClient'

const roleManagementReducer = combineReducers({
  role: roleReducer,
})

export default roleManagementReducer
