import { BasicPaegableReducers } from '@regardsoss/store-utils'
import { AccountConfiguration } from '@regardsoss/api'
import AccountActions from './AccountActions'

class AccountReducers extends BasicPaegableReducers {
  constructor() {
    super(AccountConfiguration, AccountActions)
  }
}

const instance = new AccountReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getAccountReducer(state, action) {
  return instance.reduce(state, action)
}
