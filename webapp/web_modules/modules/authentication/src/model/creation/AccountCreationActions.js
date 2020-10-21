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
import { AuthenticationRouteParameters, AuthenticationRouteHelper } from '@regardsoss/authentication-utils'

/**
 * Specific actions for create account operation (create account / create user)
 */
export default class AccountCreateActions extends BasicSignalActions {
  /**
   * Constructor
   * @param operation operation logical name, like 'createUser'
   */
  constructor(operation) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES_PUBLIC.ADMIN}/accesses`,
      resourcesEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/accesses`,
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
      originUrl: AuthenticationRouteHelper.getOriginURL(),
      requestLink: AuthenticationRouteHelper.getRequestLinkURL(AuthenticationRouteParameters.mailAuthenticationAction.values.verifyEmail),
      ...otherParameters,
    })
  }
}
