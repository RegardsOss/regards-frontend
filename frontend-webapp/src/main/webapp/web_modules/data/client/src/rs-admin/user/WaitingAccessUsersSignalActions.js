/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Specific signal actions used by admin to send accept / refuse for the waiting project users
 */
export default class WaitingAccessUsersSignalActions extends BasicSignalActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/accesses/{userId}/{updateOperation}`,
      namespace: 'admin-user-projectuser-management/waiting-accounts-signals',
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
