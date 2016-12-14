import { combineReducers } from 'redux'
import { getAccountReducer } from './model/AccountReducers'

const accountManagementReducer = combineReducers({
  account: getAccountReducer,
})


export default accountManagementReducer
