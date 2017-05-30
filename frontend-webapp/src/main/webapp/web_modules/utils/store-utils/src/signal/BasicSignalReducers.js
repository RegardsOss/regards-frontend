/**
 * @author Léo Mieulet
 */

/**
 *  Handle reduction for lists
 */
class BasicSignalReducers {

  static DEFAULT_STATE = {
    isFetching: false,
    error: {
      hasError: false,
      type: '',
      message: '',
      status: 200,
    },
    result: {},
  }

  constructor(basicSignalActionInstance) {
    this.basicSignalActionInstance = basicSignalActionInstance
  }

  reduce(state = BasicSignalReducers.DEFAULT_STATE, action) {
    switch (action.type) {
      case this.basicSignalActionInstance.SIGNAL_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: BasicSignalReducers.DEFAULT_STATE.error,
        }
      case this.basicSignalActionInstance.SIGNAL_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: {
            hasError: true,
            type: action.type,
            message: action.meta ? action.meta.errorMessage : '',
            status: action.meta ? action.meta.status : BasicSignalReducers.DEFAULT_STATE.error.status,
          },
        }
      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: BasicSignalReducers.DEFAULT_STATE.error,
          result: action.payload,
        }
      case this.basicSignalActionInstance.FLUSH:
        return BasicSignalReducers.DEFAULT_STATE
      default:
        // not in this reducer
        return state
    }
  }

}

export default BasicSignalReducers
