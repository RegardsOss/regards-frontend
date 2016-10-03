/**
 * Combine all reducers for this aa to a single root reducer.
 */
import { combineReducers } from "redux"
import TimeReducers from "./modules/websockets/reducers/TimeReducers"

export default combineReducers({
  ws: TimeReducers
})
