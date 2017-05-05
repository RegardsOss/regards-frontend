/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import WaitingAccessUsersSignalActions from './WaitingAccessUsersSignalActions'


class WaitingAccessUsersSignalReducer extends BasicSignalReducers {
  constructor(namespace) {
    super(new WaitingAccessUsersSignalActions(namespace))
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new WaitingAccessUsersSignalReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}

