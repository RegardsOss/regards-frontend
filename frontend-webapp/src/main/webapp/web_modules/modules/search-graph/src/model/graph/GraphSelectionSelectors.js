/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSelector } from '@regardsoss/store-utils'
import { REDUCER_PATH } from './GraphSelectionReducers'

/**
 * Graph selection state selectors
 */
class GraphSelectionSelectors extends BasicSelector {

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

}

export default new GraphSelectionSelectors(['modules.search-graph', REDUCER_PATH])
