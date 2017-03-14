/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

class BorrowRoleActions extends BasicSignalActions {


  /**
   * Constructor
   */
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/borrowRole/{roleName}`,
      namespace: 'menu/borrow-role',
    })
  }
  /**
   * Sends a borrow role request (warning: after the operation successfully completed,
   * you must notify central authentication reducer with the new authentication result values!)
   * @param {*} action
   */
  borrowRole(roleName) {
    return this.sendSignal('GET', null, { roleName })
  }
}

export default new BorrowRoleActions()
