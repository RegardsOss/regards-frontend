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
 */
import { BasicSignalReducers } from '@regardsoss/store-utils'
import get from 'lodash/get'
import AuthenticateActions from './AuthenticateActions'

class AuthenticateReducers extends BasicSignalReducers {
  constructor(namespace) {
    super(new AuthenticateActions(namespace), null)
  }

  reduce(state, action) {
    if (this.isCancelled(state, action)) {
      return state
    }

    const parentState = super.reduce(state, action)
    const { error, ...newState } = parentState

    // apply required state changes
    switch (action.type) {
      case this.basicSignalActionInstance.SIGNAL_REQUEST:
      case this.basicSignalActionInstance.FLUSH:
        // same behavior as parent, add specific state fields: error.loginError (user is in result)
        return {
          ...newState, // flush handled with parent state
          authenticateDate: null,
          sessionLocked: false,
          error: {
            loginError: null,
            ...error,
          },
        }
      // keep login error
      case this.basicSignalActionInstance.SIGNAL_FAILURE: {
        const errorType = get(action, 'payload.response.additionalInformation.error', 'UNKNOWN_ERROR')
        const errorMessage = get(action, 'payload.response.detailMessage', 'UNKNOWN_ERROR')
        return {
          ...newState,
          sessionLocked: state ? state.sessionLocked : false,
          error: {
            loginError: errorType,
            message: errorMessage,
            ...error,
          },
        }
      }
      // update authentication date and unlock session
      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        return {
          ...newState,
          sessionLocked: false,
          authenticateDate: Date.now(),
          error: {
            loginError: null,
            ...error,
          },
        }
      // mark session locked, keep authentication date
      case this.basicSignalActionInstance.LOCK_SESSION:
        return {
          ...state,
          sessionLocked: true,
        }
      // renew authentication data (action result, see AuthenticateActions)
      case this.basicSignalActionInstance.AUTHENTICATION_CHANGED:
        return {
          // recover previous state
          ...state,
          // update token authentication date
          authenticateDate: Date.now(),
          // use new action result authentication state
          result: { ...(state.result), ...action.result },
        }
      default:
        // not in this reducer
        return parentState
    }
  }
}


export default (namespace) => {
  const instance = new AuthenticateReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
