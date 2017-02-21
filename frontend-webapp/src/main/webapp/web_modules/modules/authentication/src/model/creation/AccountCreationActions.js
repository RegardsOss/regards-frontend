/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

import { getOriginURL } from '../Common'

/**
 * Specific actions for create account operation (create account / create user)
 */
export default class CreateAccountActions extends BasicSignalActions {

  /**
   * Constructor
   * @param operation operation logical name, like 'createUser'
   */
  constructor(operation) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/accesses/`,
      namespace: `accounts/${operation}`,
      bypassErrorMiddleware: true,
    })
  }

  /**
   * Sends a create account or create user request, depending on content
   * @param email email for the new user
   * @param otherParameters other body parameters, that may be used for the creation request
   */
  sendCreateRequest({ email, ...otherParameters }) {
    return this.sendSignal('POST', {
      email,
      originUrl: getOriginURL(),
      ...otherParameters,
    })
  }

}

