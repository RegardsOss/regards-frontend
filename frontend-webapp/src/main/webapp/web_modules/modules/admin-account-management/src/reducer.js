import { combineReducers } from 'redux'
import AccountReducer from './model/AccountReducer'

const accountManagementReducer = combineReducers({
  account: AccountReducer.getReducer,
})


export default accountManagementReducer
