import { combineReducers } from 'redux'
import AccountReducer from './model/account.reducer'
import ProjectAccountReducer from './model/projectAccount.reducer'

const userManagementReducer = combineReducers({
  account: AccountReducer,
  'project-account': ProjectAccountReducer,
})


export default userManagementReducer
