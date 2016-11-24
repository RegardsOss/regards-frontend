import { combineReducers } from 'redux'
import ProjectReducers from './model/ProjectReducers'

const projectManagementReducer = combineReducers({
  project: ProjectReducers,
})

export default projectManagementReducer
