/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalReducers } from '@regardsoss/store-utils'
import AuthenticateActions from './AuthenticateActions'

class AuthenticateReducers extends BasicSignalReducers {
  constructor() {
    super(AuthenticateActions)
  }

  reduce(state, action) {
    const { error, ...newState } = super.reduce(state, action)
    // apply required state changes
    switch (action.type) {
      case this.basicSignalActionInstance.SIGNAL_REQUEST:
      case this.basicSignalActionInstance.FLUSH:
        // same behavior as parent, add specific state fields: authentication date, user, error.loginError
        return {
          ...newState,
          authenticateDate: null,
          user: {},
          error: {
            loginError: null,
            ...error,
          },
        }
      case this.basicSignalActionInstance.SIGNAL_FAILURE:
        // keep login error
        return {
          ...newState,
          authenticateDate: null,
          user: {},
          error: {
            loginError: action.payload && action.payload.response ? action.payload.response.error : 'UNKNOWN_ERROR',
            ...error,
          },
        }
      // keep logged user
      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        return {
          ...newState,
          authenticateDate: Date.now(),
          user: action.payload,
          error: {
            loginError: null,
            ...error,
          },
        }
      default:
        // not in this reducer
        return { ...newState, error }
    }
  }
}

const instance = new AuthenticateReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)

export const pathname = 'authentication'
