/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import ProjectReducers from './model/ProjectReducers'

const portalReducer = combineReducers({
  projects: ProjectReducers,
})

export default portalReducer
