import { combineReducers } from 'redux'
import { getAccountReducer } from './model/AccountReducer'

const accountManagementReducer = combineReducers({
  account: getAccountReducer,
})


export default accountManagementReducer
