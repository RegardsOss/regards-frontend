/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const { CALL_API } = require('redux-api-middleware')

// Intercept actions to reject them if the current user sessions is expired (locked)
const SessionLockedMiddleware = store => next => (action) => {
  const currentState = store.getState()
  const callAPI = action[CALL_API]

  // If the action is a callAPI and the session of current authenticated user is locked do not send request to server.
  if (callAPI && currentState && currentState.common && currentState.common.authentication && currentState.common.authentication.sessionLocked) {
    if (callAPI.types && !callAPI.types.includes('common/authentication-manager/REQUEST')) {
      return new Promise((resolve, reject) => resolve({}))
    }
  }

  return next(action)
}

export default SessionLockedMiddleware
