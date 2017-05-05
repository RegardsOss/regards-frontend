/**
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ProjectUserConfiguration } from '@regardsoss/api'
import ProjectUserActions from './ProjectUserActions'

export class ProjectUserReducer extends BasicPageableReducers {
  constructor(namespace) {
    super(ProjectUserConfiguration, new ProjectUserActions(namespace))
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new ProjectUserReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
