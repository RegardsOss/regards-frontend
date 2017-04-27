/**
 * LICENSE_PLACEHOLDER
 **/

const TOGGLE_SELECTION_MODE_ACTION = 'TABLE/toggle-selection-mode'
const SET_TOGGLED_ELEMENTS_ACTION = 'TABLE/set-toggle-elements'

/**
 * Table actions for entities selection
 *
 * @author Sébastien Binda
 */
function toggleTableSelectionMode() {
  return {
    type: TOGGLE_SELECTION_MODE_ACTION,
  }
}

function setToggledElements(toggledElements) {
  return {
    type: SET_TOGGLED_ELEMENTS_ACTION,
    toggledElements,
  }
}

export default {
  TOGGLE_SELECTION_MODE_ACTION,
  SET_TOGGLED_ELEMENTS_ACTION,
  toggleTableSelectionMode,
  setToggledElements,
}
