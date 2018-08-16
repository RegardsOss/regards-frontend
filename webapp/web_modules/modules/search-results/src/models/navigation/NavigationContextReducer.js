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
import { DamDomain } from '@regardsoss/domain'
import { TableDisplayModeEnum } from './TableDisplayModeEnum'
import navigationContextActions from './NavigationContextActions'

/**
 * Default navigation context state
 */
export const DEFAULT_STATE = {
  viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
  displayMode: TableDisplayModeEnum.LIST,
  // initial levels list
  initialLevels: [],
  // all levels list (initial + user added)
  levels: [],
}

/**
 * reduce initialize action
 * @param {*} action initialization action
 */
const initialize = ({
  viewObjectType, displayMode, initialLevels = [], tags = [],
}) => ({
  viewObjectType, displayMode, initialLevels, levels: [...initialLevels, ...tags],
})

/**
 * Add a serach tag
 * @param {type: string, tag: Tag} action redux action to add the tag
 * @param {*} state redux state
 */
function addSearchTag({ tag }, state) {
  // forbid adding twice the same tag in levels list
  const hasAlreadyTag = state.levels.find(levelTag => levelTag.equal(tag))
  return hasAlreadyTag ? state : {
    ...state,
    levels: [...state.levels, tag],
  }
}

/**
 * Goes to specified navigation level in current navigation context (throws away the levels below)
 * @param {*} action action
 * @param {*} state current state
 */
const gotoLevel = ({ levelIndex }, state) => {
  // remove the navigation context elements that are now after the selected context element (ignore last path element to avoid noop)
  // prevent user to remove initial levels (but remove as many levels as possible when he clicks on root levels)
  const maxRemovableIndex = state.initialLevels.length
  if (levelIndex < state.levels.length) {
    return { ...state, levels: state.levels.slice(0, Math.max(levelIndex, maxRemovableIndex)) }
  }
  // last level not handled (no need to perform the same request again)
  return state
}

/**
 * Navigation context state reducer
 * @param state redux state
 * @param action action to reduce
 * @return store after reduction
 */
const reduce = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case navigationContextActions.INITIALIZE:
      return initialize(action)
    case navigationContextActions.CHANGE_VIEW_OBJECT_TYPE:
      return { ...state, viewObjectType: action.viewObjectType }
    case navigationContextActions.CHANGE_DISPLAY_MODE:
      return { ...state, displayMode: action.displayMode }
    case navigationContextActions.ADD_SEARCH_TAG:
      return addSearchTag(action, state)
    case navigationContextActions.GOTO_LEVEL:
      return gotoLevel(action, state)
    default:
      return state
  }
}

export default reduce
