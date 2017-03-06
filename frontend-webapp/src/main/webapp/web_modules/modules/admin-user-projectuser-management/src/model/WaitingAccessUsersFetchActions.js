/**
 * LICENSE_PLACEHOLDER
 */
import { ProjectUserActions } from './ProjectUserActions'

class WaitingAccessUsersFetchActions extends ProjectUserActions {

  constructor() {
    super('admin-user-projectuser-management/waiting-access-users')
  }

  fetchWaitingUsersEntityList(index, size) {
    return this.fetchPagedEntityList(index, size, null, { status: 'WAITING_ACCESS' })
  }

}

// default instance
export default new WaitingAccessUsersFetchActions()
