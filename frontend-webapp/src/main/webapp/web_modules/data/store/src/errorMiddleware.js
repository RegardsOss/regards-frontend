/**
 * LICENSE_PLACEHOLDER
 **/
import { ApplicationErrorAction } from '@regardsoss/global-sytem-error'

export default store => next => (action) => {
  if (action.error && (!action.meta || !action.meta.bypassErrorMiddleware)) {
    if (action.payload) {
      let statusText
      if (action.payload.response && action.payload.response.message) {
        statusText = `Server request error : ${action.payload.response.message}`
      } else if (action.payload.response && action.payload.response.messages) {
        statusText = `Server request error : ${action.payload.response.messages[0]}`
      } else if (action.payload.status) {
        switch (action.payload.status) {
          case 404:
            statusText = 'Error 404: Server did not recognized that URL'
            break
          default:
            statusText = 'Server request error'
        }
      }
      const message = `${statusText}`

      store.dispatch(
        ApplicationErrorAction.throwError(
          message,
          action.meta,
          action.payload,
        ),
      )
    } else {
      const message = `An internal error occurred: ${action.type}`
      store.dispatch(
        ApplicationErrorAction.throwError(
          message,
        ),
      )
    }
  }
  return next(action)
}
