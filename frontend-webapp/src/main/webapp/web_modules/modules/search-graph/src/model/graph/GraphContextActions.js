/**
* LICENSE_PLACEHOLDER
**/

class GraphContextActions {

  constructor() {
    this.ENTITY_SELECTED = 'search-graph/ENTITY_SELECTED'
    this.SET_DATASET_ATTRIBUTES_VISIBLE = 'search-graph/SET_DATASET_VISIBLE'
    this.SET_MODULE_COLLAPSED = 'search-graph/SET_MODULE_COLLAPSED'
    this.SHOW_ENTITY_DESCRIPTION = 'search-graph/SHOW_ENTITY_DESCRIPTION'
    this.HIDE_ENTITY_DESCRIPTION = 'search-graph/HIDE_ENTITY_DESCRIPTION'
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

  /**
   * Set datasets attributes visible or hidden
   * @param bool visible is visible?
   */
  setDatasetAttributesVisible(visible) {
    return {
      type: this.SET_DATASET_ATTRIBUTES_VISIBLE,
      visible,
    }
  }

  /**
   * Sets module collaped (or expanded)
   * @param bool collapsed is collapsed?
   */
  setModuleCollapsed(collapsed) {
    return {
      type: this.SET_MODULE_COLLAPSED,
      collapsed,
    }
  }

  /**
   * Shows entity description
   * @param {*} entity entity
   */
  showDescription(entity) {
    return {
      type: this.SHOW_ENTITY_DESCRIPTION,
      entity,
    }
  }

  /**
   * Hides entity description
   */
  hideDescription() {
    return {
      type: this.HIDE_ENTITY_DESCRIPTION,
    }
  }

}

export default new GraphContextActions()
