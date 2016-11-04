import { combineReducers } from 'redux'
import ProjectReducers from './projects/model/ProjectReducers'


const portalReducer = combineReducers({
  projects: ProjectReducers,
})

export default portalReducer
