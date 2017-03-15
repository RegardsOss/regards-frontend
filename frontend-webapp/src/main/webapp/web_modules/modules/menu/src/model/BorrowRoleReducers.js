/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalReducers } from '@regardsoss/store-utils'
import BorrowRoleActions from './BorrowRoleActions'

class BorrowRoleReducers extends BasicSignalReducers {
  constructor() {
    super(BorrowRoleActions)
  }
}

const instance = new BorrowRoleReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)

export const PATH = 'borrow-role'
