/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

export class WaitingAccountSignalActions extends BasicSignalActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/accounts/acceptAccount/{userId}`,
      namespace: 'admin-account-management/waiting-account-signals',
    })
  }

  sendAccept(userId) {
    return this.sendSignal('PUT', null, {
      userId,
    })
  }

}

// export singleton instance
export default new WaitingAccountSignalActions()
