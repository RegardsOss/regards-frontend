/**
 * LICENSE_PLACEHOLDER
 **/
import { ApplicationErrorAction } from '@regardsoss/global-sytem-error'

export default store => next => (action) => {
  if (action.error) {
    const statusText = action.payload.response && action.payload.response.message ? action.payload.response.message : 'Server request error'
    const url = action.payload.response && action.payload.response.url ? action.payload.response.url : action.type
    const message = `${statusText}. (${url})`

    store.dispatch(
      ApplicationErrorAction.throwError(
        message,
        action.meta,
        action.payload,
      ),
    )
  }
  return next(action)
}
