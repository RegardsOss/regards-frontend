import { combineReducers } from 'redux'
import AccountReducer from './model/account.reducer'
import ProjectAccountReducer from './model/projectAccount.reducer'
import ProjectUserReducers from './model/ProjectUserReducers'

const projectUserManagementReducer = combineReducers({
  account: AccountReducer,
  'project-account': ProjectAccountReducer,
  'project-user': ProjectUserReducers.getReducer,
})


export default projectUserManagementReducer
