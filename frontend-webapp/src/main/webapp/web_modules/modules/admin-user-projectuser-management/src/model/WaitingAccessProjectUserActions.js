/**
 * LICENSE_PLACEHOLDER
 */
import { ProjectUserActions } from './ProjectUserActions'

class WaitingAccessProjectUserActions extends ProjectUserActions {

  constructor() {
    super('admin-user-projectuser-waitingaccess-management')
  }

  fetchWaitingUsersEntityList(index, size) {
    return this.fetchPagedEntityList(index, size, { status: 'WAITING_ACCESS' })
  }

}

// default instance
export default new WaitingAccessProjectUserActions()
