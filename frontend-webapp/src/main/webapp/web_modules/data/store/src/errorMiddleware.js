/**
 * LICENSE_PLACEHOLDER
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
//const isSilentError = actionMeta => actionMeta && ()

export default store => next => (action) => {
  if (action.error && !isSilentError(action)) {
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

      store.dispatch(
        ApplicationErrorAction.throwError(
          message,
          action.meta,
          action.payload,
        ),
      )
    } else {
      const message = `An internal error occurred: \n ${action.type}`
      store.dispatch(
        ApplicationErrorAction.throwError(
          message,
        ),
      )
    }
  }
  return next(action)
}
