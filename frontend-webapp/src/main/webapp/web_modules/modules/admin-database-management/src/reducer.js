/*
 * LICENSE_PLACEHOLDER
 */
import { combineReducers } from 'redux'
import { projectReducers } from './client/ProjectClient'
import { projectConnectionReducers } from './client/ProjectConnectionClient'

const databaseManagementReducer = combineReducers({
  projectConnections: projectConnectionReducers,
  projects: projectReducers,
})

export default databaseManagementReducer
