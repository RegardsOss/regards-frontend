/**
 * LICENSE_PLACEHOLDER
 **/
import { ApplicationErrorAction } from '@regardsoss/global-system-error'

export default store => next => (action) => {
  if (action.error && (!action.meta || !action.meta.bypassErrorMiddleware)) {
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
      if (serverMessage.includes('io.jsonwebtoken.ExpiredJwtException')) {
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
