/**
 * LICENSE_PLACEHOLDER
 **/
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
  items: [],
}
/**
 *  Handle reduction for arrays
 */
class BasicArrayReducer {

  constructor(basicArrayActionInstance) {
    this.basicArrayActionInstance = basicArrayActionInstance
  }

  reduce(state = defaultState, action) {
    switch (action.type) {
      case this.basicArrayActionInstance.ENTITY_LIST_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: defaultState.error,
        }
      case this.basicArrayActionInstance.ENTITY_LIST_FAILURE:
        return {
          ...state,
          error: {
            hasError: true,
            type: action.type,
            message: action.meta ? action.meta.errorMessage : '',
            status: action.meta ? action.meta.status : defaultState.error.status,
          },
        }
      case this.basicArrayActionInstance.ENTITY_LIST_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: defaultState.error,
          items: action.payload,
        }
      case this.basicArrayActionInstance.FLUSH:
        return defaultState
      default:
        return state
    }
  }

}

export default BasicArrayReducer
