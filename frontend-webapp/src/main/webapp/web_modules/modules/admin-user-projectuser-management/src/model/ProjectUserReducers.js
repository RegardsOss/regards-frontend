/**
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ProjectUserConfiguration } from '@regardsoss/api'
import ProjectUserActions from './ProjectUserActions'

export class ProjectUserReducers extends BasicPageableReducers {
  constructor(Actions = ProjectUserActions) {
    super(ProjectUserConfiguration, Actions)
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

export const reducerPath = 'project-user'
