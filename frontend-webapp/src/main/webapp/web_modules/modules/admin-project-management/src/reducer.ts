import ProjectReducer from "./model/reducer"
import { combineReducers } from "redux"

export const projectManagementReducer = combineReducers({
  "project": ProjectReducer
})

