import AccountReducer from "./model/account.reducer"
import ProjectAccountReducer from "./model/projectAccount.reducer"

import { combineReducers } from "redux"

export const userManagementReducer = combineReducers({
  "account": AccountReducer,
  "project-account": ProjectAccountReducer,
})

