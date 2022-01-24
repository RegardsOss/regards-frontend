/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
      // back from an account creation mail
      verifyEmail: 'verify_email',
      // back from an unlock mail
      unlockAccount: 'unlock_account',
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

const getParameterClosure = (param) => () => (browserHistory.getCurrentLocation().query && browserHistory.getCurrentLocation().query[param.urlKey])

/**
 * Parameter values util
 */
export const AuthenticationParametersHelper = {
  getToken: getParameterClosure(routeParameters.token),
  getOriginURL: () => decodeURIComponent(getParameterClosure(routeParameters.originURL)()),
  getAccountEmail: getParameterClosure(routeParameters.accountEmail),
  getMailAuthenticationAction: getParameterClosure(routeParameters.mailAuthenticationAction),
}

export const routeHelpers = {
  /**
   * Determinates if user in back in UI from an authentication request mail
   * @return boolean - true if the UI in current state has been opened when back from a mail
   */
  isBackFromAuthenticationMail: () => {
    const { query } = browserHistory.getCurrentLocation()
    return !!query[routeParameters.mailAuthenticationAction.urlKey]
  },
  /**
   * Does redirection, to be used only when back from authentication mail
   */
  doRedirection: () => {
    browserHistory.push(AuthenticationParametersHelper.getOriginURL())
  },
}
