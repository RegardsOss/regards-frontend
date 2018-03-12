/**
* LICENSE_PLACEHOLDER
**/

/**
 * Search results navigation context actions: handles navigation context in results
 */
class NavigationContextActions {
  constructor() {
    this.INITIALIZE = 'search-results/navigation-context/INITIALIZE'
    this.CHANGE_VIEW_OBJECT_TYPE = 'search-results/navigation-context/CHANGE_VIEW_OBJECT_TYPE'
    this.CHANGE_DISPLAY_MODE = 'search-results/navigation-context/CHANGE_DISPLAY_MODE'
    this.ADD_SEARCH_TAG = 'search-results/navigation-context/ADD_SEARCH_TAG'
    this.GOTO_LEVEL = 'search-results/navigation-context/GOTO_LEVEL'
  }

  /**
   * Initializes the store for module root navigation context (mapped from URL)
   * @param viewObjectType initial view object type (dataobjects or datasets)
   * @param displayMode display mode
   * @param initialLevels initial context tags
   * @param {[Tag]} tags current tags list (optional)
   * @return {type: string, ...} dispatchable redux action
   */
  initialize(viewObjectType, displayMode, initialLevels, tags = []) {
    return {
      type: this.INITIALIZE,
      viewObjectType,
      displayMode,
      initialLevels,
      tags,
    }
  }

  /**
   * Change view object type
   * @param viewObjectType new view object type (dataobjects or datasets)
   * @return {type: string, ...} dispatchable redux action
   */
  changeViewObjectType(viewObjectType) {
    return {
      type: this.CHANGE_VIEW_OBJECT_TYPE,
      viewObjectType,
    }
  }

  /**
   * Change dislay type
   * @param viewObjectType new view object type (dataobjects or datasets)
   * @return {type: string, ...} dispatchable redux action
   */
  changeTableDisplayMode(displayMode) {
    return {
      type: this.CHANGE_DISPLAY_MODE,
      displayMode,
    }
  }

  /**
   * Adds a search tag in current tags list context
   * @return {type: string, ...} dispatchable redux action
   */
  addSearchTag(tag) {
    return {
      type: this.ADD_SEARCH_TAG,
      tag,
    }
  }

  /**
   * Moves navigation context to level index as parameter (and deletes the following navigation elements). Index ranges from
   * 0 (delete all elements) to N+1 (=== levels.length, keep all elements)
   * @param levelIndex level index of the new last navigation element, from 0 to size(navigationContextArray -1
   * @return {type: string, ...} dispatchable redux action
   */
  gotoLevel(levelIndex) {
    return {
      type: this.GOTO_LEVEL,
      levelIndex,
    }
  }
}

export default new NavigationContextActions()
