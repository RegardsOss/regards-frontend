/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { AuthenticationClient, AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import isString from 'lodash/isString'
// Redux middleware provides a third-party extension point
// between dispatching an action, and the moment it reaches the reducer
const { RSAA } = require('redux-api-middleware')

/**
 * Check if the session is locked.
 * @param state
 * @returns {*}
 */
const sessionIsLocked = (state) => get(state, 'common.authentication.sessionLocked', false)

/**
 * Returns Authorization header value, or null if no authorization possible
 * @param {*} state redux state
 * @param {*} callAPI call API for current action
 * @return Authorization header value or null
 */
const getAuthorization = (state, callAPI) => {
  if ((!AuthenticationClient.authenticationSelectors.isAuthenticated(state) || sessionIsLocked(state)) && callAPI.endpoint.includes(AuthenticationClient.SPECIFIC_ENDPOINT_MARKER)) {
    // for authentication only => provide client secret
    return `Basic ${btoa('client:secret')}`
  }
  if (AuthenticationClient.authenticationSelectors.isAuthenticated(state) && !sessionIsLocked(state)) {
    // provide known token
    const accessToken = AuthenticationClient.authenticationSelectors.getAccessToken(state)
    return `Bearer ${accessToken}`
  }
  // not authentified
  return null
}

/**
 * Builds authorization headers for current authorization state
 */
const getAuthorizationHeaders = (callStore, callAPI) => {
  const authorizationValue = getAuthorization(callStore, callAPI)
  if (authorizationValue) { // use authorization
    return { Authorization: authorizationValue }
  }
  // use public in project scope
  return { scope: AuthenticationParametersSelectors.getProject(callStore) }
}

/**
 * Builds default types headers, to be used when not overriden by the action
 */
const getDefaultTypesHeaders = (callAPI) => {
  const defaultTypeHeaders = {
    Accept: 'application/json, text/plain',
  }
  // String body: json, otherwise: none (multi part form, each part specifies its type)
  if (isString(callAPI.body)) {
    defaultTypeHeaders['Content-type'] = 'application/json'
  }
  return defaultTypeHeaders
}

// Intercept actions
// If the action is formated as [RSAA]: {...}, inject the headers
const headersMiddleware = () => (next) => (action) => {
  const callAPI = action[RSAA]
  const apiEndpoint = get(callAPI, 'endpoint', '')
  // add regards headers for specific regards requests only
  if (callAPI && apiEndpoint.startsWith(`${GATEWAY_HOSTNAME}`)) {
    const specificHeaders = callAPI.headers || {}
    callAPI.headers = (callStore) => ({
      // lower preference: locally added headers
      ...getDefaultTypesHeaders(callAPI),
      ...getAuthorizationHeaders(callStore, callAPI),
      // higher preference: action specific headers
      ...specificHeaders,
    })
  }
  return next(action)
}

export default headersMiddleware
