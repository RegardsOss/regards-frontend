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
import get from 'lodash/get'
import isString from 'lodash/isString'

const { RSAA } = require('redux-api-middleware')

const EMPTY_ARRAY = []
const COMMON_AUTHENTICATION_NAMESPACE = 'common/authentication-manager'

/**
 * Is action CALL API as parameter an authentication request
 * @param {*} callAPI callAPI part of the action
 * @return {boolean} true if action is a call API action
 */
function isAuthenticationRequest(callAPI) {
  return get(callAPI, 'types', EMPTY_ARRAY).find((typeOrObject) => isString(typeOrObject)
    ? typeOrObject.startsWith(COMMON_AUTHENTICATION_NAMESPACE)
    : typeOrObject.type.startsWith(COMMON_AUTHENTICATION_NAMESPACE))
}

/**
 * Determinates if the action should be blocked as session is locked
 * @param {*} action redux action to test
 * @param {*}
 * @return {boolean} true when action is a fetch action and session is locked (blocking case)
 */
function shouldBlockAction(action, store) {
  const callAPI = action[RSAA]
  // 1 - Is it a fetch action (but not authentication fetch)? (ie: is it a CALL API action but not an authentication action)
  if (!callAPI || isAuthenticationRequest(callAPI)) {
    // No: it must be handled no matter the session state
    return false
  }
  // 2 - Is session locked
  // Note: we need here to recompute it, as brwosers timers are broken when Operating System session is locked (see Sess)
  // 2.a - is user authenticated?
  const reduxState = store.getState()
  const authentication = get(reduxState, 'common.authentication', null)
  const authenticateExpirationDate = get(authentication, 'authenticateExpirationDate', null)
  if (!authenticateExpirationDate) {
    // Not authenticated => session cannot be locked
    return false
  }

  // 2.b - user is authenticated => session is locked if token expired
  return authenticateExpirationDate - Date.now() <= 0
}

// Intercept actions to reject them if the current user sessions is expired (locked)
const SessionLockedMiddleware = (store) => (next) => (action) => {
  // If the action is a callAPI and the session of current authenticated user is locked do not send request to server.
  if (shouldBlockAction(action, store)) {
    return new Promise((resolve, reject) => resolve({}))
  }
  return next(action)
}

export default SessionLockedMiddleware
