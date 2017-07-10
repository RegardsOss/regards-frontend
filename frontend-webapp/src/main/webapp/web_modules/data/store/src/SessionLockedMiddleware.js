/**
 * LICENSE_PLACEHOLDER
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
