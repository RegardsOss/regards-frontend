/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

export class WaitingAccessUsersUpdateActions extends BasicSignalActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/accesses/{updateOperation}/{userId}`,
      namespace: 'admin-user-projectuser-management/',
    })
  }

  sendAccept(userId) {
    return this.sendSignal('PUT', null, {
      updateOperation: 'accept',
      userId,
    })
  }

  sendDeny(userId) {
    return this.sendSignal('PUT', null, {
      updateOperation: 'deny',
      userId,
    })
  }

}

// export singleton instance
export default new WaitingAccessUsersUpdateActions()
