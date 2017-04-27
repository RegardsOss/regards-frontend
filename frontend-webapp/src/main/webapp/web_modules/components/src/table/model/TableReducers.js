/**
 * LICENSE_PLACEHOLDER
 **/
import {
  TOGGLE_SELECTION_MODE_ACTION,
  SET_TOGGLED_ELEMENTS_ACTION,
} from './TableActions'
import TableSelectionModes from '../selection/TableSelectionModes'

const TABLE_REDUX_STORE_NAME = 'fixed-table'

/**
 * Table reducers for entities selection
 *
 * @author Sébastien Binda
 */
const tableReducer = (state = { selectMode: TableSelectionModes.includeSelected, toggledElements: {} }, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case TOGGLE_SELECTION_MODE_ACTION :
      if (state.selectMode === TableSelectionModes.includeSelected) {
        newState.selectMode = TableSelectionModes.excludeSelected
      } else {
        newState.selectMode = TableSelectionModes.includeSelected
      }
      return newState
    case SET_TOGGLED_ELEMENTS_ACTION :
      newState.toggledElements = Object.assign({}, action.toggledElements)
      return newState
    default :
      return state
  }
}

const getReducers = (tableName) => {
  const reducers = {}
  reducers[tableName] = tableReducer
  return reducers
}

export default {
  getReducers,
  TABLE_REDUX_STORE_NAME,
}
