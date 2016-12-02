import { BasicListReducers } from '@regardsoss/store-utils'
import { AccountConfiguration } from '@regardsoss/api'
import AccountActions from './AccountActions'

class AccountReducers extends BasicListReducers {
  constructor() {
    super(AccountConfiguration, AccountActions)
  }

  getReducer(state, action) {
    return instance.reduce(state, action)
  }
}

const instance = new AccountReducers()
export default instance
