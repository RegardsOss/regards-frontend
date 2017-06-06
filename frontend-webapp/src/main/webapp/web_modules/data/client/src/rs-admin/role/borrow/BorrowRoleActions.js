/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'


/**
 * Actions to send a borrow role request
 */
export default class BorrowRoleActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.AUTHENTICATION}/borrowRole/{roleName}`,
    })
  }

  /**
   * Sends a borrow role request (warning: after the operation successfully completed,
   * you must notify central authentication reducer with the new authentication result values!)
   * @param roleName role name
   */
  borrowRole(roleName) {
    return this.sendSignal('GET', null, { roleName })
  }

}
