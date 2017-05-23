/**
 * LICENSE_PLACEHOLDER
 **/
import TableSelectionModes from './TableSelectionModes'
import TableActions from './TableActions'


export const DEFAULT_STATE = {
  selectionMode: TableSelectionModes.includeSelected,
  toggledElements: {}, // dictionnary by level index
}

class TableReducer {

  constructor(namespace) {
    this.tableActions = new TableActions(namespace)
  }

  reduce = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case this.tableActions.SET_SELECTION:
        return {
          selectionMode: action.selectionMode,
          toggledElements: action.toggledElements,
        }
      case this.tableActions.TOGGLE_ELEMENT: {
        // switch element state: if already toggled, untoggle it, toggle it otherwise
        const toggledElements = { ...state.toggledElements }
        if (toggledElements[action.rowIndex]) {
          delete toggledElements[action.rowIndex] // remove from dictionnary
        } else {
          toggledElements[action.rowIndex] = action.element // add into dictionnary
        }
        return {
          selectionMode: state.selectionMode,
          toggledElements,
        }
      }
      default: // do nothing for other actions
        return state
    }
  }

}

export default (namespace) => {
  const reducer = new TableReducer(namespace)
  return (state, action) => reducer.reduce(state, action)
}

