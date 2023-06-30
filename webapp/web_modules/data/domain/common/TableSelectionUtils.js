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
import { TableSelectionModes } from '@regardsoss/components'

/**
 * @author Léo Mieulet
 */

/**
 * Is user selection from infinite table contains several entities
 * @param {string} selectionMode selection mode, from TableSelectionModes
 * @param {[*]} selection as an array of IngestShapes.Request
 * @param {{totalElements: number}} pageMeta containing the total number of elements
 * @return {boolean} true when the selection contains more than one entity
 * (A) In inclusive mode, there is more than one selected element
 * 'B) In exclusive mode, there is "total elements" +1 greater than selected elements
 */
function isSeveralEntitiesSelected(selectionMode, selection, pageMeta) {
  if (selectionMode === TableSelectionModes.includeSelected) { // A
    return selection.length > 1
  }
  // B
  return pageMeta.totalElements - selection.length > 1
}

export default {
  isSeveralEntitiesSelected,
}
