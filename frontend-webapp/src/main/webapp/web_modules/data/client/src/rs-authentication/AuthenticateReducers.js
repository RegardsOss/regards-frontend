/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalReducers } from '@regardsoss/store-utils'
import AuthenticateActions from './AuthenticateActions'

class AuthenticateReducers extends BasicSignalReducers {
  constructor(namespace) {
    super(new AuthenticateActions(namespace))
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
      // keep login error
      case this.basicSignalActionInstance.SIGNAL_FAILURE: {
        const errorType = action.payload && action.payload.response && action.payload.response.additionalInformation &&
          action.payload.response.additionalInformation.error ? action.payload.response.additionalInformation.error : 'UNKNOWN_ERROR'
        const errorMessage = action.payload && action.payload.response && action.payload.response.detailMessage ?
          action.payload.response.detailMessage : 'UNKNOWN_ERROR'
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
        return { error, ...newState }
    }
  }
}


export default (namespace) => {
  const instance = new AuthenticateReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
