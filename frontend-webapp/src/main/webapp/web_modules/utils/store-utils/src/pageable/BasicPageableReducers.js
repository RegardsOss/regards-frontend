/**
 * @author Léo Mieulet
 */
import BasicListReducers from '../list/BasicListReducers'

/**
 *  Handle reduction for pageable entity lists
 */
class BasicPageableReducer extends BasicListReducers {

  reduce(state, action) {
    const newState = super.reduce(state, action)
    console.log('REDUCER ACTION', action)
    switch (action.type) {
      case this.basicListActionInstance.ENTITY_LIST_SUCCESS :
        return Object.assign({}, newState, {
          metadata: action.payload.metadata,
        })
      default :
        return newState
    }
  }

}

export default BasicPageableReducer
