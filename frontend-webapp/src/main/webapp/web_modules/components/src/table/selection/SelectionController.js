/**
* LICENSE_PLACEHOLDER
**/
import isEmpty from 'lodash/isEmpty'
import size from 'lodash/size'
import keys from 'lodash/keys'
import TableSelectionModes from './TableSelectionModes'

/**
* Selection controller
*/
export default class SelectionController {

  constructor(entities, onSelectionChange) {
    this.currentMode = TableSelectionModes.includeSelected
    this.entities = entities // external update allowed
    this.onSelectionChange = onSelectionChange // external update allowed
    this.toggledEntities = {} // stored row index of toggled  entities (selected in include mode, deselected in exclude mode)
  }

  isSelectedRow(rowIndex) {
    const notToggled = !this.toggledEntities[rowIndex]
    // in include selection mode (additive), selected rows are the one toggled. Reverted logic in exlude mode
    return this.currentMode === TableSelectionModes.includeSelected ? !notToggled : notToggled
  }

  toggleRowSelectedState = (rowIndex) => {
    if (this.toggledEntities[rowIndex]) {
      // remove toggled mark
      delete this.toggledEntities[rowIndex]
    } else {
      // add toggle mark
      this.toggledEntities[rowIndex] = true
    }
    this.notifySelectionListener()
  }

  areAllSelected() {
    return (this.currentMode === TableSelectionModes.includeSelected && size(this.toggledEntities) === size(this.entities)) ||
      (this.currentMode === TableSelectionModes.excludeSelected && isEmpty(this.toggledEntities))
  }

  toggleSelectAll() {
    if (this.areAllSelected()) {
      // unselect all (enter the additive selection mode)
      this.currentMode = TableSelectionModes.includeSelected
    } else {
      // not all selected: select all (enter substrative mode)
      this.currentMode = TableSelectionModes.excludeSelected
    }
    // whatever the case, clear toggled entities (we will be adapting the mode)
    this.toggledEntities = {}
    this.notifySelectionListener()
  }

  notifySelectionListener() {
    // notify listener
    this.onSelectionChange(this.currentMode, keys(this.toggledEntities).map(k => this.entities[k]))
  }

}
