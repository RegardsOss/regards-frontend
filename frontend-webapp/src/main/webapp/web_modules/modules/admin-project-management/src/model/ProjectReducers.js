import { BasicPaegableReducers } from '@regardsoss/store-utils'
import { ProjectConfiguration } from '@regardsoss/api'
import ProjectActions from './ProjectActions'

class ProjectReducers extends BasicPaegableReducers {
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
export function getProjectReducer(state, action) {
  return instance.reduce(state, action)
}
