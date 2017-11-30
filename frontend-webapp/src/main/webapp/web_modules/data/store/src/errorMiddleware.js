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
import { ApplicationErrorAction } from '@regardsoss/global-system-error'

const ASYNC_VALIDATION_ACTION_TYPE = '@@redux-form/STOP_ASYNC_VALIDATION'

function isSilentError(action) {
  // Silent errors if:
  // - it is an async form validation action (should'nt be handled, local action!)
  // - it is explicity marked to bypass error middleware
  return action.type === ASYNC_VALIDATION_ACTION_TYPE ||
    (action.meta && action.meta.bypassErrorMiddleware)
}

/**
 * Computes silent errors (to not be logged):
 * @param {*} actionMeta
 */
// const isSilentError = actionMeta => actionMeta && ()

export default store => next => (action) => {
  // Do not throw error for form validation errors.
  if (action.error && !isSilentError(action) && (action.type !== '@@redux-form/SET_SUBMIT_FAILED')) {
    if (action.payload) {
      const statusText = 'Server request error'
      let serverMessage = ''
      if (action.payload.response && action.payload.response.message) {
        serverMessage = action.payload.response.message
      } else if (action.payload.response && action.payload.response.messages) {
        serverMessage = action.payload.response.messages[0]
      }

      if (action.payload.response && action.payload.response.status === 404) {
        serverMessage = `${action.payload.response.path} -> ${serverMessage}`
      }
      if (serverMessage && serverMessage.includes('io.jsonwebtoken.ExpiredJwtException')) {
        serverMessage = 'Session expired'
      }
      const message = `${statusText} : \n ${serverMessage}`

      store.dispatch(ApplicationErrorAction.throwError(
        message,
        action.meta,
        action.payload,
      ))
    } else {
      const message = `An internal error occurred: \n ${action.type}`
      store.dispatch(ApplicationErrorAction.throwError(message))
    }
  }
  return next(action)
}
