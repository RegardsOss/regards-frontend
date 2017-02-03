/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'
import { browserHistory } from 'react-router'
import AuthenticationRouteHelpers from '@regardsoss/authentication-manager'

/**
 * Reset password actions:
 */
class ResetPasswordActions extends BasicSignalActions {

  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/account/{accountEmail}/resetPassword`,
      namespace: 'account/reset-password',
    })
  }

  /**
   * Sends a request to ask reset password
   * @param accountEmail account email
   */
  sendAskReset(accountEmail) {
    // compute reset URL: use current URL without parameters
    const originURL = browserHistory.getCurrentLocation().pathname
    const rootInterfaceURL = originURL.includes('?') ? originURL.substring(0, originURL.lastIndexOf('?')) : originURL
    const resetURL = `${rootInterfaceURL}?${AuthenticationRouteHelpers.mailAuthenticationAction.urlKey}=${AuthenticationRouteHelpers.mailAuthenticationAction.values.changePassword}`
    this.sendSignal('POST', { resetURL, originURL }, { accountEmail })
  }

}

export default ResetPasswordActions
