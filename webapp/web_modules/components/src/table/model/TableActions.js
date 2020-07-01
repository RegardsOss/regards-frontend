/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Table redux actions
 */
class TableActions {
  constructor(namespace) {
    this.SET_SELECTION = `${namespace}/TABLE/set-selection`
    this.TOGGLE_ELEMENT = `${namespace}/TABLE/toggle-element`
    this.CLEAR = `${namespace}/TABLE/clear`
  }

  /**
   * Selects all elements in table
   * @return action to dispatch
   */
  selectAll() {
    return this.setSelection(TableSelectionModes.excludeSelected)
  }

  /**
   * Unselects all elements in table
   * @return action to dispatch
   */
  unselectAll() {
    return this.setSelection(TableSelectionModes.includeSelected)
  }

  /**
   * Sets table selection
   * @param {*} selectionMode  selection mode
   * @param {*} toggledElements toggled elements for that mode, as a dictionary {[rowIndex:number]:object} (optional)
   * @return action to dispatch
   */
  setSelection(selectionMode, toggledElements = {}) {
    return {
      type: this.SET_SELECTION,
      selectionMode,
      toggledElements,
    }
  }

  /**
   * @param rowIndex element row
   * @param element to toggle
   * @return action to toggle selected / deselected state of an element
   */
  toggleElement(rowIndex, element) {
    return {
      type: this.TOGGLE_ELEMENT,
      rowIndex,
      element,
    }
  }
}

export default TableActions
