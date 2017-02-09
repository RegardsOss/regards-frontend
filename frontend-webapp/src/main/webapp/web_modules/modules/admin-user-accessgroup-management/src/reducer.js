/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import accessGroup from './model/AccessGroupReducers'

const accessGroupManagementReducer = combineReducers({
  'access-group': accessGroup,
})

export default accessGroupManagementReducer
