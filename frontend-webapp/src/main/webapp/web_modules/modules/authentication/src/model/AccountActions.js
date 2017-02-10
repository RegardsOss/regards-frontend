/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'
import root from 'window-or-global'
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'

export default class AccountActions extends BasicSignalActions {

  /**
   * Constructor
   * @param endpointName URL endpoint name, like createAccount ...
   * @param mailAuthenticationActionValue back to UI action from AuthenticationRouteHelpers.mailAuthenticationAction.values
   */
  constructor(endpointName, mailAuthenticationActionValue) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/accounts/{accountEmail}/${endpointName}`,
      namespace: `accounts/${endpointName}`,
      bypassErrorMiddleware: true,
    })
    this.mailAuthenticationActionValue = mailAuthenticationActionValue
  }

  /**
   * Sends ask request to the server, first step of two for an account request (unlock / reset password)
   * @param accountEmail mail of the related account
   */
  sendAskRequest(accountEmail) {
    // compute reset URL: use current URL without parameters
    const originUrl = root.location.href
    const resetUrl = `${root.location.host}${root.location.pathname}?${AuthenticationRouteParameters.mailAuthenticationAction.urlKey}=${this.mailAuthenticationActionValue}`
    return this.sendSignal('POST', {
      resetUrl,
      originUrl,
    }, { accountEmail })
  }

  /**
   * Sends finish request to the server, second step of two for an account request (unlock / reset password)
   * @param accountEmail account email
   * @param token backend token, provided for the corresponding reset ask request
   * @param otherBodyParameters other body parameters required to complete the request in an object like { key1: value1, key2: value2 ...}
   */
  sendFinishRequest(token, accountEmail, otherBodyParameters) {
    return this.sendSignal('PUT', {
      token,
      ...otherBodyParameters,
    }, { accountEmail })
  }


}

