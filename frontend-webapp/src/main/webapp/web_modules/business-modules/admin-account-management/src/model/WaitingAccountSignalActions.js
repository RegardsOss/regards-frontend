/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

export class WaitingAccountSignalActions extends BasicSignalActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/accesses/acceptAccount/{account_email}`,
      namespace: 'admin-account-management/waiting-account-signals',
    })
  }

  sendAccept(accountEmail) {
    return this.sendSignal('PUT', null, {
      account_email: accountEmail,
    })
  }

}

// export singleton instance
export default new WaitingAccountSignalActions()
