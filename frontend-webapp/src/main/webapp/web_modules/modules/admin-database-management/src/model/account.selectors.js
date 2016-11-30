import { BasicSelector } from '@regardsoss/store-utils'

class AccountSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'user-management', 'account'])
  }

  getAccounts(state) {
    return this.uncombineStore(state).items
  }
  getAccountById(state, id) {
    return this.uncombineStore(state).items[id]
  }

}

const instance = new AccountSelectors()
export default instance
