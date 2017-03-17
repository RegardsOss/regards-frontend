/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien binda
 */
class CatalogEntitySelector extends BasicPageableSelectors {
  constructor() {
    super(['modules.search-results', 'results'])
  }

  /**
   * @param {*} state redux state
   * @returns {* | undefined} facets for the current result
   */
  getFacets(state) {
    return this.uncombineStore(state).metadata
  }
}

const instance = new CatalogEntitySelector()
export default instance
