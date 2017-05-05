/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalReducers } from '@regardsoss/store-utils'
import BorrowRoleActions from './BorrowRoleActions'

class BorrowRoleReducer extends BasicSignalReducers {
  constructor(namespace) {
    super(new BorrowRoleActions(namespace))
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new BorrowRoleReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}

