/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Description state module user dialog management actions
 * @author Raphaël Mechali
 */
export class DescriptionStateActions {
  /**
   * Constructor
   * @param {*} namespace actions namespace
   */
  constructor(namespace) {
    this.SET_DESCRIPTION_PATH = `${namespace}/set-description-path`
    this.SET_SELECTED_TREE_ENTRY = `${namespace}/set-selected-tree-entry`
    this.SET_BROWSING_TREE_VISIBLE = `${namespace}/set-show-browsing-tree`
  }

  /**
   * Sets the current description path (nota: it may also be used for loading, as each entity holds its loading status)
   * @param {[*]} descriptionPath path to set
   * @returns {*} action to dispatch
   */
  setDescriptionPath(descriptionPath = []) {
    return {
      type: this.SET_DESCRIPTION_PATH,
      descriptionPath,
    }
  }

  /**
   * Sets selected tree entry in currently selected entity
   * @param {number} entityIndex entity index in description path
   * @param {{section: string, child: number}} selectedEntry selected entry
   * @returns {*} action to dispatch
   */
  setSelectedTreeEntry(entityIndex, treeEntry) {
    return {
      type: this.SET_SELECTED_TREE_ENTRY,
      entityIndex,
      treeEntry,
    }
  }

  /**
   * Set rowsing tree visible
   * @param {boolean} browsingTreeVisible true to show browsing tree, false to hide it
   * @returns {*} action to dispatch
   */
  setBrowsingTreeVisible(browsingTreeVisible) {
    return {
      type: this.SET_BROWSING_TREE_VISIBLE,
      browsingTreeVisible,
    }
  }
}
