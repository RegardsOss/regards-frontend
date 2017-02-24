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
        // same behavior as parent, add specific state fields: error.loginError (user is in result)
        return {
          ...newState,
          authenticateDate: null,
          sessionLocked: false,
          error: {
            loginError: null,
            ...error,
          },
        }
      case this.basicSignalActionInstance.SIGNAL_FAILURE:
        // keep login error
        return {
          ...newState,
          sessionLocked: state ? state.sessionLocked : false,
          error: {
            loginError: action.payload && action.payload.response ? action.payload.response.error : 'UNKNOWN_ERROR',
            ...error,
          },
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
      case AuthenticateActions.LOCK_SESSION:
        return {
          ...state,
          authenticateDate: state.authenticateDate,
          sessionLocked: true,
        }
      default:
        // not in this reducer
        return { error, ...newState }
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
