/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ProjectConnectionConfiguration } from '@regardsoss/api'
import ProjectConnectionActions from './ProjectConnectionActions'


/**
 * Redux Reducer for ProjectConnection actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class ProjectConnectionReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(ProjectConnectionConfiguration, new ProjectConnectionActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ProjectConnectionReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
