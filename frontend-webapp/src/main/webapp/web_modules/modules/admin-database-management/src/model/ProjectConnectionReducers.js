import { BasicListReducers } from '@regardsoss/store-utils'
import { ProjectConnectionConfiguration } from '@regardsoss/api'
import ProjectConnectionActions from './ProjectConnectionActions'

class ProjectConnectionReducers extends BasicListReducers {
  constructor() {
    super(ProjectConnectionConfiguration, ProjectConnectionActions)
  }
}

const instance = new ProjectConnectionReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function getProjectConnectionReducers(state, action) {
  return instance.reduce(state, action)
}
