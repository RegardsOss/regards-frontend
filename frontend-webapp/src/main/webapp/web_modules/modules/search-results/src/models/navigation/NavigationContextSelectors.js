/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Navigation context state selectors
 */
class NavigationContextSelectors extends BasicSelector {

  /**
   * Returns current levels
   * @param {*} state store
   * @return store navigation view object type
   */
  getLevels(state) {
    return this.uncombineStore(state).levels
  }

  /**
   * Returns current levels
   * @param {*} state store
   * @return store navigation context view object type
   */
  getViewObjectType(state) {
    return this.uncombineStore(state).viewObjectType
  }

  /**
   * Returns current levels
   * @param {*} state store
   * @return store navigation context view object type
   */
  getDisplayMode(state) {
    return this.uncombineStore(state).displayMode
  }

}

export default new NavigationContextSelectors(['modules.search-results', 'navigationContext'])
