/**
* LICENSE_PLACEHOLDER
**/

class GraphSelectionActions {

  constructor() {
    this.ENTITY_SELECTED = 'search-graph/ENTITY_SELECTED'
  }

  /**
   * Changes selected entity for a given level
   * @param {*} levelIndex level index (0 to N-1)
   * @param {*} entity entity selected (contains ipId and type) or null to remove level selection
   */
  selectEntity(levelIndex, entity) {
    return {
      type: this.ENTITY_SELECTED,
      levelIndex,
      entity,
    }
  }

}

export default new GraphSelectionActions()
