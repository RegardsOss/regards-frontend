/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicSignalActions } from '@regardsoss/store-utils'
import { AuthenticationRouteHelper } from '@regardsoss/authentication-utils'

/**
 * Actions for existing account requests
 */
export default class AccountOperationActions extends BasicSignalActions {
  /**
   * Constructor
   * @param endpointName URL endpoint name, like createAccount ...
   * @param mailAuthenticationActionValue back to UI action from AuthenticationRouteHelpers.mailAuthenticationAction.values
   */
  constructor(endpointName, mailAuthenticationActionValue) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES_PUBLIC.ADMIN_INSTANCE}/accounts/{accountEmail}/${endpointName}`,
      resourcesEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN_INSTANCE}/accounts/{accountEmail}/${endpointName}`,
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
    return this.sendSignal('POST', {
      requestLink: AuthenticationRouteHelper.getRequestLinkURL(this.mailAuthenticationActionValue),
      originUrl: AuthenticationRouteHelper.getOriginURL(),
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

  sendChangePasswordRequest(accountEmail, oldPassword, newPassword) {
    return this.sendSignal('PUT', { oldPassword, newPassword }, { accountEmail })
  }
}
