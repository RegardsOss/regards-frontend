/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

export class RefuseAccountSignalActions extends BasicSignalActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/accesses/refuseAccount/{account_email}`,
      namespace: 'admin-account-management/refuse-account-signals',
    })
  }

  sendRefuse(accountEmail) {
    return this.sendSignal('PUT', null, {
      account_email: accountEmail,
    })
  }

}

// export singleton instance
export default new RefuseAccountSignalActions()
