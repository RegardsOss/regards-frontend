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