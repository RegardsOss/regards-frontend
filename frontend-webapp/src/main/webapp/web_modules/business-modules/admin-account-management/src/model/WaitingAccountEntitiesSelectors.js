import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { PATHNAME } from './WaitingAccountEntitiesReducers'

class WaitingAccountEntitiesSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'account-management', PATHNAME])
  }
}

const instance = new WaitingAccountEntitiesSelectors()
export default instance
