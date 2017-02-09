/**
 * @author Léo Mieulet
 */

const defaultState = {
  isFetching: false,
  error: {
    hasError: false,
    type: '',
    message: '',
    status: 200,
  },
  result: {},
}
/**
 *  Handle reduction for lists
 */
class BasicSignalReducers {

  constructor(basicSignalActionInstance) {
    this.basicSignalActionInstance = basicSignalActionInstance
  }

  reduce(state = defaultState, action) {
    switch (action.type) {
      case this.basicSignalActionInstance.SIGNAL_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: defaultState.error,
        }
      case this.basicSignalActionInstance.SIGNAL_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: {
            hasError: true,
            type: action.type,
            message: action.meta ? action.meta.errorMessage : '',
            status: action.meta ? action.meta.status : '',
          },
        }
      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: defaultState.error,
          result: action.payload,
        }
      case this.basicSignalActionInstance.FLUSH:
        return defaultState
      default:
        // not in this reducer
        return state
    }
  }

}

export default BasicSignalReducers
