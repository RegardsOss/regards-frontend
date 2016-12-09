import { combineReducers } from 'redux'
import getProjectConnectionReducers from './model/ProjectConnectionReducers'

const databaseManagementReducer = combineReducers({
  projectConnection: getProjectConnectionReducers,
})

export default databaseManagementReducer
