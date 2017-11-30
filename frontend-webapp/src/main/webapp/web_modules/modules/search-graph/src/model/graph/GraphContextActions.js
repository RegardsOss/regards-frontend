/**
* LICENSE_PLACEHOLDER
**/

class GraphContextActions {
  constructor() {
    this.ENTITY_SELECTED = 'search-graph/ENTITY_SELECTED'
    this.SET_DATASET_ATTRIBUTES_VISIBLE = 'search-graph/SET_DATASET_VISIBLE'
    this.SET_MODULE_COLLAPSED = 'search-graph/SET_MODULE_COLLAPSED'
    this.SET_SEARCH_TAG = 'search-graph/SET_SEARCH_TAG'
  }

  /**
   * Changes selected entity for a given level
   * @param {*} levelIndex level index (0 to N-1)
   * @param {*} entity entity selected (contains ipId and type) or null to remove level selection
   * @return action to return
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
   * @return action to return
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
   * @return action to return
   */
  setModuleCollapsed(collapsed) {
    return {
      type: this.SET_MODULE_COLLAPSED,
      collapsed,
    }
  }

  /**
   * Dispatches a search tag change
   * @param {string} searchTag search tag (see @regardsoss/domain/catalog/Tag)
   * @return action to return
   */
  setSearchTag(searchTag) {
    return {
      type: this.SET_SEARCH_TAG,
      searchTag,
    }
  }
}

export default new GraphContextActions()
