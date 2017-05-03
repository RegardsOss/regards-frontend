/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { RoleConfiguration } from '@regardsoss/api'
import BorrowableRolesActions from './BorrowableRolesActions'

class BorrowableRolesReducer extends BasicListReducers {
  constructor() {
    super(RoleConfiguration, BorrowableRolesActions)
  }
}

const instance = new BorrowableRolesReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}

export const PATH = 'borrowable-roles'
