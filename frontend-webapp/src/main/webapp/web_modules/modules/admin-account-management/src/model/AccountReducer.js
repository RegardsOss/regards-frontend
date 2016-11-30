import { BasicListReducers } from '@regardsoss/store-utils'
import AccountActions from './AccountActions'

class AccountReducers extends BasicListReducers {
  constructor() {
    super({
      entityKey: 'id',
      normalizrKey: 'accounts',
    }, AccountActions)
  }

  getReducer(state, action) {
    return instance.reduce(state, action)
  }
}

const instance = new AccountReducers()
export default instance
