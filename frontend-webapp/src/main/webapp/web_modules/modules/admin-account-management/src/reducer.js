import { combineReducers } from 'redux'
import AccountReducer from './model/AccountReducer'

const userManagementReducer = combineReducers({
  account: AccountReducer,
})


export default userManagementReducer
