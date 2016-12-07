import { combineReducers } from 'redux'
import { getProjectReducer } from './model/ProjectReducers'

const projectManagementReducer = combineReducers({
  project: getProjectReducer,
})

export default projectManagementReducer
