import { combineReducers } from 'redux'
import RoleReducers from './model/RoleReducers'

const roleManagementReducer = combineReducers({
  role: RoleReducers.getReducer,
})

export default roleManagementReducer
