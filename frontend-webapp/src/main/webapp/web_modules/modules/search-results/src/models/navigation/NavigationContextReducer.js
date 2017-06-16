/**
* LICENSE_PLACEHOLDER
**/
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import NavigationLevel from './NavigationLevel'
import navigationContextActions from './NavigationContextActions'

/**
 * Default navigation context state
 */
export const DEFAULT_STATE = {
  viewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
  levels: [],
}

/**
 * reduce initialize action
 * @param {*} action initialization action
 */
const initialize = ({ viewObjectType, displayMode, initialContextLabel, searchTag, dataset }) => {
  // store root level
  const levels = [NavigationLevel.buildRootLevel(initialContextLabel)]
  // append search tag if specified
  if (searchTag) {
    levels.push(NavigationLevel.buildSearchTagLevel(searchTag))
  }
  // append dataset if specified
  if (dataset) {
    const { label, ipId } = dataset.content
    levels.push(NavigationLevel.buildDatasetLevel(ipId, label))
  }
  return { viewObjectType, displayMode, levels }
}

/**
 * Returns a copied array of levels without types specifed as parameter
 * @param {*} levels levels
 * @param {*} levelTypes  types to remove
 * @returns filtered level array copy
 */
const getLevelsWithout = (levels, levelTypes) => levels.filter(({ levelType }) => !levelTypes.includes(levelType))

/**
 * Changes search tag in current navigation context
 * @param {*} action  action
 * @param {*} state current state
 */
const changeSearchTag = ({ searchTag }, state) => {
  // compute next levels parents (remove searchTag and dataset)
  const levels = getLevelsWithout(state.levels, [NavigationLevel.LevelTypes.SEARCH_TAG, NavigationLevel.LevelTypes.DATASET])
  // store the new search tag if it is available (when not, just reset to none)
  if (searchTag) {
    levels.push(NavigationLevel.buildSearchTagLevel(searchTag))
  }
  return { ...state, levels }
}


/**
 * Changes dataset in current navigation context
 * @param {*} action action
 * @param {*} state current state
 */
const changeDataset = ({ dataset }, state) => {
  // compute next levels parents (remove dataset)
  const levels = getLevelsWithout(state.levels, [NavigationLevel.LevelTypes.DATASET])
  // store the new search tag if it is available (when not, just reset to none)
  if (dataset) {
    levels.push(NavigationLevel.buildDatasetLevel(dataset.content.ipId, dataset.content.label))
  }
  return { ...state, levels }
}

/**
 * Goes to specified navigation level in current navigation context (throws away the levels below)
 * @param {*} action action
 * @param {*} state current state
 */
const gotoLevel = ({ levelIndex }, state) => {
  // remove the navigation context elements that are now after the selected context element (ignore last path element to avoid noop)
  if (levelIndex >= 0 && levelIndex < state.levels.length - 1) {
    return { ...state, levels: state.levels.slice(0, levelIndex + 1) }
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
    case navigationContextActions.CHANGE_SEARCH_TAG:
      return changeSearchTag(action, state)
    case navigationContextActions.CHANGE_DATASET:
      return changeDataset(action, state)
    case navigationContextActions.GOTO_LEVEL:
      return gotoLevel(action, state)

    default:
      return state
  }
}

export default reduce
