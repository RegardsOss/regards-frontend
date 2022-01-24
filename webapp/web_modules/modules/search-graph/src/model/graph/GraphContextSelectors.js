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
import { BasicSelector } from '@regardsoss/store-utils'
import { REDUCER_PATH } from './GraphContextReducers'

/**
 * Graph context state selectors
 */
class GraphContextSelectors extends BasicSelector {
  /**
   * Returns selection path
   * @param {*} state store
   */
  getSelectionPath(state) {
    return this.uncombineStore(state).selectionPath
  }

  /**
   * Returns selection for level as parameter
   * @param {*} state store
   * @param {*} levelIndex level index from 0 (root) to N-1
   * @return selection for level as parameter (see graph selection shape and reducer)
   */
  getSelectionForLevel(state, levelIndex) {
    const selectionPath = this.getSelectionPath(state) || []
    if (levelIndex >= selectionPath.length) {
      // no selection here yet
      return null
    }
    return selectionPath[levelIndex]
  }

  /**
   * Returns selection for the parent of level as parameter
   * @param {*} state store
   * @param {*} levelIndex level index from 0 (root) to N-1
   * @return selection for level as parameter (see graph selection shape and reducer)
   */
  getSelectionForParentLevel(state, levelIndex) {
    if (levelIndex === 0) {
      // parent selection is null
      return null
    }
    return this.getSelectionForLevel(state, levelIndex - 1)
  }

  /**
   * Returns dataset attributes visible from state
   * @param state : redux state
   * @return bool
   */
  areDatasetAttributesVisible = (state) => this.uncombineStore(state).datasetsAttributesVisible
}

export default new GraphContextSelectors(['modules.search-graph', REDUCER_PATH])
