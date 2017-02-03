/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'

/**
 Holds authentication route parameters
 */
const routeParameters = {
  // main parameter used when entering back UI from an authentication request mail
  mailAuthenticationAction: {
    urlKey: 'external_auth_action',
    values: {
      // back from an unlock mail
      accountUnlocked: 'account_unlocked',
        // back from an account creation mail
      accountCreated: 'account_created',
        // back from a reset password request
      changePassword: 'change_password',
    },
  },
  // secondary parameters used when entering back UI from an authentication request mail
  // email address
  accountEmail: {
    urlKey: 'account_email',
  },
  // origin URL, used to redirect the user after login
  originURL: {
    urlKey: 'origin_url',
  },
  // server token
  token: {
    urlKey: 'token',
  },
}

export default routeParameters

/**
 * Determinates if user in back in UI from an authentication request mail
 * @return bool - true if the UI in current state has been opened when back from a mail
 */
export function isBackFromAuthenticationMail() {
  const query = browserHistory.getCurrentLocation().query
  return !!query[routeParameters.mailAuthenticationAction.urlKey]
}

const getParameterClosure = param => () => browserHistory.getCurrentLocation().query && browserHistory.getCurrentLocation().query[param.urlKey]

/**
 * Parameter values util
 */
export const AuthenticationParametersHelper = {
  getToken: getParameterClosure(routeParameters.token),
  getOriginURL: getParameterClosure(routeParameters.originURL),
  getAccountEmail: getParameterClosure(routeParameters.accountEmail),
  getMailAuthenticationAction: getParameterClosure(routeParameters.mailAuthenticationAction),
}

