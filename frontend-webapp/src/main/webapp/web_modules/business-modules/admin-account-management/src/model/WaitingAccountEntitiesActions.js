import { AccountActions } from './AccountActions'

class WaitingAccountEntitiesActions extends AccountActions {
  constructor() {
    super('admin-account-management/waiting-accounts-entities')
  }

  fetchWaitingAccountsEntityList(index, size) {
    return this.fetchPagedEntityList(index, size, null, { status: 'PENDING' })
  }

}

const instance = new WaitingAccountEntitiesActions()
export default instance
