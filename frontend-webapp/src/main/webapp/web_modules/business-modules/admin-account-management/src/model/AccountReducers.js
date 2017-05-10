import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AccountConfiguration } from '@regardsoss/api'
import AccountActions from './AccountActions'

export class AccountReducers extends BasicPageableReducers {
  constructor(Actions = AccountActions) {
    super(AccountConfiguration, Actions)
  }
}

const instance = new AccountReducers()

/**
 * Return a function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)

export const PATHNAME = 'account'
