import { BasicListSelectors } from '@regardsoss/store-utils'

class AccountSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'account-management', 'account'])
  }
}

const instance = new AccountSelectors()
export default instance
