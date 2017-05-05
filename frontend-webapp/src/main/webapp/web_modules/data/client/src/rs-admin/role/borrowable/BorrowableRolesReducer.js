/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { RoleConfiguration } from '@regardsoss/api'
import BorrowableRolesActions from './BorrowableRolesActions'

class BorrowableRolesReducer extends BasicListReducers {
  constructor(namespace) {
    super(RoleConfiguration, new BorrowableRolesActions(namespace))
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new BorrowableRolesReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}

