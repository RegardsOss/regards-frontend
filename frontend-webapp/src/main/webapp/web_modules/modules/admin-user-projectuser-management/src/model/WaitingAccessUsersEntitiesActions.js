/**
 * LICENSE_PLACEHOLDER
 */
import { ProjectUserActions } from './ProjectUserActions'

class WaitingAccessUsersEntitiesActions extends ProjectUserActions {

  constructor() {
    super('admin-user-projectuser-management/waiting-access-users-entities')
  }

  fetchWaitingUsersEntityList(index, size) {
    return this.fetchPagedEntityList(index, size, null, { status: 'WAITING_ACCESS' })
  }

}

// default instance
export default new WaitingAccessUsersEntitiesActions()
