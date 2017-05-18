/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { accessGroupReducer } from './clients/AccessGroupClient'

const accessGroupManagementReducer = combineReducers({
  'access-group': accessGroupReducer,
})

export default accessGroupManagementReducer
