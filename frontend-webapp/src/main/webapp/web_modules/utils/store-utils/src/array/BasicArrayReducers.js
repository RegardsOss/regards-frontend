/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * @author Léo Mieulet
 */
/**
 *  Handle reduction for arrays
 */
class BasicListReducer {

  constructor(basicArrayActionInstance) {
    this.basicArrayActionInstance = basicArrayActionInstance
  }

  reduce(state = {
    isFetching: false,
    items: [],
  }, action) {
    switch (action.type) {
      case this.basicArrayActionInstance.ENTITY_LIST_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case this.basicArrayActionInstance.ENTITY_LIST_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
        })
      case this.basicArrayActionInstance.ENTITY_LIST_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.payload,
        })
      case this.basicArrayActionInstance.FLUSH:
        return {
          isFetching: false,
          items: {},
        }
      default:
        return state
    }
  }

}

export default BasicListReducer
