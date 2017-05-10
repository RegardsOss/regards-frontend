import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { PATHNAME } from './AccountReducers'

class AccountSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'account-management', PATHNAME])
  }
}

const instance = new AccountSelectors()
export default instance

