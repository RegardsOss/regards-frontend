/**
* LICENSE_PLACEHOLDER
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

