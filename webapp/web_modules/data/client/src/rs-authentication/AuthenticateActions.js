/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/** Specific authentication end point marker */
const SPECIFIC_ENDPOINT_MARKER = 'oauth/token'

export default class AuthenticateActions extends BasicSignalActions {
  /**
   * Constructor
   */
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.AUTHENTICATION}/${SPECIFIC_ENDPOINT_MARKER}?grant_type=password&username={username}&password={password}&scope={scope}&origineUrl={origineUrl}&requestLink={requestLink}`,
      namespace,
      bypassErrorMiddleware: true,
    })
    this.CLEAR_AUTH_ERROR = `${namespace}/CLEAR_AUTH_ERROR`
    this.LOCK_SESSION = `${namespace}/LOCK_SESSION`
    this.AUTHENTICATION_CHANGED = `${namespace}/AUTHENTICATION_CHANGED`
  }

  /**
   * Locks current user session
   */
  lockSession() {
    return {
      type: this.LOCK_SESSION,
    }
  }

  forceAuthentication(externalAuthentication) {
    return {
      payload: externalAuthentication,
      type: this.SIGNAL_SUCCESS,
    }
  }

  login(username, password, scope, origineUrl, requestLink) {
    return this.sendSignal('POST', {}, {
      username,
      password,
      scope,
      origineUrl,
      requestLink,
    })
  }

  logout() {
    return this.flush()
  }

  clearErrors() {
    return {
      type: this.CLEAR_AUTH_ERROR,
    }
  }

  /**
   * Notifies authentication state changed. Especially used for role borrowing, as we need a
   * new token / authentication date managed. May be used to change other authentication values later
   * @param result: new authentication state result (as returned by the server)
   * @param {number} authenticateDate authenticateDate date as ms (defaults to NOW for common cases)
   */
  notifyAuthenticationChanged(result, authenticateDate = Date.now()) {
    return {
      type: this.AUTHENTICATION_CHANGED,
      authenticateDate,
      result,
    }
  }
}
export { SPECIFIC_ENDPOINT_MARKER }
