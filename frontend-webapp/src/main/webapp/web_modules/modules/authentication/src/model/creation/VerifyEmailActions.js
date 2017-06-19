/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Specific actions for email verification, when user is back from mail using activation link
 */
class VerifyEmailActions extends BasicSignalActions {

  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/accesses/verifyEmail/{token}`,
      namespace: 'accounts/verifyEmail',
      bypassErrorMiddleware: true,
    })
  }

  /**
   * Sends a validation request for a new account (from external email)
   * @param token validation token
   */
  sendValidationRequest(token) {
    return this.sendSignal('GET', {}, { token })
  }

}

export default new VerifyEmailActions()

