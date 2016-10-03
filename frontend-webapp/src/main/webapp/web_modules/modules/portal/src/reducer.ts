import { combineReducers } from "redux"
import ProjectReducers from "./projects/model/ProjectReducers"
export const portalReducer = combineReducers({
  "projects": ProjectReducers
})
