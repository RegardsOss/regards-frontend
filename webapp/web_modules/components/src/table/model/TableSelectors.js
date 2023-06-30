/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import keys from 'lodash/keys'
import { createSelector } from 'reselect'
import { BasicSelector } from '@regardsoss/store-utils'
import TableSelectionModes from './TableSelectionModes'

export class TableSelectors extends BasicSelector {
  /**
   * Is empty selection? Compute empty selection using external page results selectors and buffers it with reselect
   * @param state redux store
   * @param pageResultsSelectors page results selectors: selects metadata in table results
   * @return {boolean} computed empty selection state
   */
  isEmptySelection = (state, pageResultsSelectors) => {
    if (!this.reselectEmptySelection) {
      // init reselector instance
      this.reselectEmptySelection = createSelector([
        // 1 - get page meta
        (localState) => pageResultsSelectors.getMetaData(localState),
        // 2 - get toggled elements
        (localState) => this.getSelectionMode(localState),
        // 3 - get selection mode
        (localState) => this.getToggledElements(localState),
      ], (pageMetadata, selectionMode, toggledElements) => {
        const totalElements = (pageMetadata && pageMetadata.totalElements) || 0
        const selectionSize = keys(toggledElements).length
        return (selectionMode === TableSelectionModes.includeSelected && selectionSize === 0)
          || (selectionMode === TableSelectionModes.excludeSelected && totalElements > 0 && selectionSize === totalElements)
      })
    }
    // select or reselect
    return this.reselectEmptySelection(state)
  }

  /**
   * Are all selected?
   * @param state redux store
   * @param pageResultsSelectors page results selectors: selects metadata in table results
   * @return {boolean} computed all selected state (note: returns false when there is no data)
   */
  areAllSelected = (state, pageResultsSelectors) => {
    if (!this.reselectAllSelected) {
      // init reselector instance
      this.reselectAllSelected = createSelector([
        // 1 - get page meta
        (localState) => pageResultsSelectors.getMetaData(localState),
        // 2 - get toggled elements
        (localState) => this.getSelectionMode(localState),
        // 3 - get selection mode
        (localState) => this.getToggledElements(localState),
      ], (pageMetadata, selectionMode, toggledElements) => {
        const totalElements = (pageMetadata && pageMetadata.totalElements) || 0
        const selectionSize = keys(toggledElements).length
        return totalElements > 0 && (
          (selectionMode === TableSelectionModes.includeSelected && selectionSize === totalElements)
          || (selectionMode === TableSelectionModes.excludeSelected && !selectionSize))
      })
    }
    // select or reselect
    return this.reselectAllSelected(state)
  }

  /**
   * @param state redux store
   * @return current selection mode (as a TableSelectionModes)
   */
  getSelectionMode(state) {
    return this.uncombineStore(state).selectionMode
  }

  /**
   * @param state redux store
   * @return currently toggled elements
   */
  getToggledElements(state) {
    return this.uncombineStore(state).toggledElements
  }

  /**
   * @param state redux store
   * @return {[*]} currently toggled elements as array
   */
  getToggledElementsAsList = createSelector(
    [(localState) => this.getToggledElements(localState)],
    (toggledElements) => values(toggledElements))
}

export default (storePath) => new TableSelectors(storePath)
