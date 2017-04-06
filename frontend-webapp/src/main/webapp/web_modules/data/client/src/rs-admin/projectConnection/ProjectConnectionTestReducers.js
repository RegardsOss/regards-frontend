/*
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalReducers } from '@regardsoss/store-utils'
import ProjectConnectionTestActions from './ProjectConnectionTestActions'

/**
 * Redux Reducer for ProjectConnection actions.
 *
 * To user those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class ProjectConnectionTestReducers extends BasicSignalReducers {
  constructor(namespace) {
    super(new ProjectConnectionTestActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ProjectConnectionTestReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
