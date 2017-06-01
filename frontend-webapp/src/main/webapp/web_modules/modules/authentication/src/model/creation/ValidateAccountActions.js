/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Specific actions for account validation, when user is back from mail using activation link
 */
class ValidateAccountActions extends BasicSignalActions {

  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/accesses/validateAccount/{token}`,
      namespace: 'accounts/validateAccount',
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

export default new ValidateAccountActions()

