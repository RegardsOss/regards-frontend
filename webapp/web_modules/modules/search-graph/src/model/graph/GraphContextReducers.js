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
import graphContextActions from './GraphContextActions'

/**
 * Builds the new selection path, from current state and action data.
 * Note: a precondition for it is that the selection DO NOT 'JUMP OVER' levels: when selecting an element in a level,
 * there must be a selection for every parent level (except for root level)
 * @param {*} previousSelectionPath previous selection path
 * @param { levelIndex, entity } action action as received by redux
 */
const getNewSelectionPath = (previousSelectionPath, { levelIndex, entity }) => {
  if (levelIndex > previousSelectionPath.length) {
    throw new Error('Invalid state: the selection path must be complete up to the new selection level (cannot "jump over" selection levels)')
  }
  // when selecting a new element, the elements after in selection should be cutted (tree navigation).
  // Note: slice gets us a copy of the array, better for redux behaviors ;-)
  const newSelectionPath = previousSelectionPath.slice(0, levelIndex)
  // if selected entity is not null, ie not a selection reset on level, then consider it in selection path
  if (entity) {
    const { ipId, entityType, label } = entity.content
    newSelectionPath.push({ ipId, entityType, label })
  }
  return newSelectionPath
}

export const DEFAULT_STATE = {
  selectionPath: [],
  datasetsAttributesVisible: false,
  searchTag: null,
}

const reduce = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case graphContextActions.ENTITY_SELECTED:
      // reset search tag
      return { ...state, searchTag: null, selectionPath: getNewSelectionPath(state.selectionPath, action) }
    case graphContextActions.SET_DATASET_ATTRIBUTES_VISIBLE:
      return { ...state, datasetsAttributesVisible: action.visible }
    case graphContextActions.SET_SEARCH_TAG:
      return { ...state, searchTag: action.searchTag }
    default:
      return state
  }
}

// export a reducer capable object (with reduce method defined)
export default reduce

export const REDUCER_PATH = 'graph-context'
