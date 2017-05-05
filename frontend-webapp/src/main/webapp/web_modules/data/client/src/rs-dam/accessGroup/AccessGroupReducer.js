/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AccessGroupConfiguration } from '@regardsoss/api'
import AccessGroupActions from './AccessGroupActions'

class AccessGroupReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(AccessGroupConfiguration, new AccessGroupActions(namespace))
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new AccessGroupReducers(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
