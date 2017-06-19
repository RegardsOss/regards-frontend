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
    this.CHANGE_SEARCH_TAG = 'search-results/navigation-context/CHANGE_SEARCH_TAG'
    this.CHANGE_DATASET = 'search-results/navigation-context/CHANGE_DATASET'
    this.GOTO_LEVEL = 'search-results/navigation-context/GOTO_LEVEL'
  }

  /**
   * Initializes the store for module root navigation context (mapped from URL)
   * @param viewObjectType initial view object type (dataobjects or datasets)
   * @param rootContextLabel root context label, optional
   * @param searchTag initial search tag, optional
   * @param initial dataset, optional
   *
   * @return action to dispatch
   */
  initialize(viewObjectType, displayMode, initialContextLabel, searchTag, dataset) {
    return {
      type: this.INITIALIZE,
      viewObjectType,
      displayMode,
      initialContextLabel,
      searchTag,
      dataset,
    }
  }

  /**
   * Change view object type
   * @param viewObjectType new view object type (dataobjects or datasets)
   * @return action to dispatch
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
   * @return action to dispatch
   */
  changeDisplayMode(displayMode) {
    return {
      type: this.CHANGE_DISPLAY_MODE,
      displayMode,
    }
  }

  /**
   * Change or remove search tag
   * @param {string} searchTag  new search tag or null
   */
  changeSearchTag(searchTag) {
    return {
      type: this.CHANGE_SEARCH_TAG,
      searchTag,
    }
  }

  /**
   * Change or remove dataset
   * @param {*} dataset  new dataset as specified by dataset model { content: {ipId, label}} or null
   */
  changeDataset(dataset) {
    return {
      type: this.CHANGE_DATASET,
      dataset,
    }
  }


  /**
   * Moves navigation context to level index as parameter (and deletes the following navigation elements)
   * @param levelIndex level index of the new last navigation element, from 0 to size(navigationContextArray -1
   * @return action to dispatch
   */
  gotoLevel(levelIndex) {
    return {
      type: this.GOTO_LEVEL,
      levelIndex,
    }
  }

}

export default new NavigationContextActions()
