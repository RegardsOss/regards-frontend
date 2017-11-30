/**
* LICENSE_PLACEHOLDER
**/
import BasicPageableReducers from '../pageable/BasicPageableReducers'

/**
 * Actions that are pageable and expose 'facets' field (same level than page metadata)
 */
class BasicFacetsPageableReducers extends BasicPageableReducers {
  reduce(state, action) {
    if (this.isCancelled(state, action)) {
      return state
    }
    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicListActionInstance.ENTITY_LIST_SUCCESS:
        return {
          ...newState,
          facets: action.payload.facets,
        }
      default:
        return newState
    }
  }
}

export default BasicFacetsPageableReducers
