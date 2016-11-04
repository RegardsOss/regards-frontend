import { combineReducers } from 'redux'
import ProjectReducer from './model/reducer'

const projectManagementReducer = combineReducers({
  project: ProjectReducer,
})

export default projectManagementReducer
