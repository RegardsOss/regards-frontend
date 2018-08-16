/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
