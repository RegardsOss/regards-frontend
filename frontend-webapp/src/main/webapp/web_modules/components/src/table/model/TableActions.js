/**
 * LICENSE_PLACEHOLDER
 **/
import TableSelectionModes from './TableSelectionModes'

/**
 * Table redux actions
 */
class TableActions {

  constructor(namespace) {
    this.SET_SELECTION = `${namespace}/TABLE/set-selection`
    this.TOGGLE_ELEMENT = `${namespace}/TABLE/toggle-element`
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
   * @param {*} toggledElements toggled elements for that mode, as a dictionnary {[rowIndex:number]:object} (optional)
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
