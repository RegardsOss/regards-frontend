import { BasicListReducers } from '@regardsoss/store-utils'
import { ProjectUserConfiguration } from '@regardsoss/api'
import ProjectUserActions from './ProjectUserActions'

class ProjectUserReducers extends BasicListReducers {
  constructor() {
    super(ProjectUserConfiguration, ProjectUserActions)
  }
}

const instance = new ProjectUserReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getProjectUserReducer(state, action) {
  return instance.reduce(state, action)
}
