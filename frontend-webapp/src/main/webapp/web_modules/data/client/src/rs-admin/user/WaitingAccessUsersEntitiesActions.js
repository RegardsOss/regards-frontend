/**
 * LICENSE_PLACEHOLDER
 */
import ProjectUserActions from './ProjectUserActions'

export default class WaitingAccessUsersEntitiesActions extends ProjectUserActions {

  fetchWaitingUsersEntityList(index, size) {
    return this.fetchPagedEntityList(index, size, null, { status: 'WAITING_ACCESS' })
  }

}

