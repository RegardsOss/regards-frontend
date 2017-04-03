/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ModuleConfiguration } from '@regardsoss/api'
import ModuleActions from './ModuleActions'

/**
 * Redux Reducer for ProjectActions actions.
 *
 * To user thoses actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class ModuleReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(ModuleConfiguration, new ModuleActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ModuleReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}

