/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import ProjectUserSignalActions from './ProjectUserSignalActions'


class ProjectUserSignalReducer extends BasicSignalReducers {
  constructor(namespace) {
    super(new ProjectUserSignalActions(namespace))
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new ProjectUserSignalReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}

