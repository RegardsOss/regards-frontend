import { ApplicationErrorAction } from '@regardsoss/global-system-error'


class ErrorHandler {
  /**
   * Handle an error during HTTP Request error.
   *
   * @param dispatch redux store dispatch function
   * @param action error action to handle
   * @param state current state
   * @param res HTTP request response
   * @returns {{errorMessage: string}}
   */
  onRequestFailure = (dispatch, action, state, res) => {
    const statusText = res && res.statusText ? res.statusText : 'Server request error'
    const url = res && res.url ? res.url : action.type
    const message = `${statusText}. (${url})`

    // Send action to handle error display if any. See @regardsoss/global-system-error
    if (dispatch) {
      dispatch(ApplicationErrorAction.throwError(message))
    }

    // Return payload action error message
    return {
      errorMessage: statusText,
    }
  }
}

export default ErrorHandler
