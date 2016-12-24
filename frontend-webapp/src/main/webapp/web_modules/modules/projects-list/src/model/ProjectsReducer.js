/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ProjectConfiguration } from '@regardsoss/api'
import ProjectsAction from './ProjectsAction'

/**
 * Redux store reducer for Module entities
 */
class ProjectsReducer extends BasicPageableReducers {
  constructor() {
    super(ProjectConfiguration, ProjectsAction)
  }

}

const instance = new ProjectsReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getProjectsReducer = (state, action) => instance.reduce(state, action)

export default getProjectsReducer
