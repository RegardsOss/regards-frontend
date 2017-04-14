/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { LayoutConfiguration } from '@regardsoss/api'
import LayoutActions from './LayoutActions'

/**
 * Redux Reducer for LayoutActions actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class LayoutReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(LayoutConfiguration, new LayoutActions(namespace))
  }
}

export default (namespace) => {
  const instance = new LayoutReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
