import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ProjectConfiguration } from '@regardsoss/api'
import ProjectActions from './ProjectActions'

class ProjectReducers extends BasicPageableReducers {
  constructor() {
    super(ProjectConfiguration, ProjectActions)
  }

}

const instance = new ProjectReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getProjectReducer = (state, action) => instance.reduce(state, action)

export default getProjectReducer
