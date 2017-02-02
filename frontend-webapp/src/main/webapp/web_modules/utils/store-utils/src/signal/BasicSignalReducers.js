/**
 * @author Léo Mieulet
 */

/**
 *  Handle reduction for lists
 */
class BasicSignalReducers {

  constructor(basicSignalActionInstance) {
    this.basicSignalActionInstance = basicSignalActionInstance
  }

  reduce(state = {
    isFetching: false,
    error: {
      hasError: false,
      type: '',
      message: '',
    },
    result: {},
  }, action) {
    switch (action.type) {
      case this.basicSignalActionInstance.SIGNAL_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case this.basicSignalActionInstance.SIGNAL_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          error: {
            hasError: true,
            type: action.type,
            message: action.meta ? action.meta.errorMessage : '',
          },
        })
      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          result: action.payload,
        })
      case this.basicSignalActionInstance.FLUSH:
        return Object.assign({}, state, {
          isFetching: false,
          error: {
            hasError: false,
            type: '',
            message: '',
          },
          result: {},
        })
      default:
        return state
    }
  }

}

export default BasicSignalReducers
