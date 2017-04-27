/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ProjectConfiguration } from '@regardsoss/api'
import ProjectActions from './ProjectActions'

/**
 * Redux Reducer for ProjectActions actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class ProjectReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(ProjectConfiguration, new ProjectActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ProjectReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}

