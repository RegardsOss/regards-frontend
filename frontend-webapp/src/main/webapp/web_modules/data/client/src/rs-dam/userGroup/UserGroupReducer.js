/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import UserGroupActions from './UserGroupActions'

class UserGroupReducer extends BasicSignalReducers {
  constructor(namespace) {
    super(new UserGroupActions(namespace))
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new UserGroupReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
