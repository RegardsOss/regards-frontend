import { combineReducers } from "redux"
import { dataManagementReducer } from "@regardsoss/admin-data-management"
import { projectManagementReducer } from "@regardsoss/admin-project-management"


export const adminReducer = combineReducers({
  "data-management": dataManagementReducer,
  "project-management": projectManagementReducer
})
