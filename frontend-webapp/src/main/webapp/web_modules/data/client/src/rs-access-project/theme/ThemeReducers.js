/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ThemeConfiguration } from '@regardsoss/api'
import ThemeActions from './ThemeActions'

/**
 * Redux Reducer for ProjectActions actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class ThemeReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(ThemeConfiguration, new ThemeActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ThemeReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
