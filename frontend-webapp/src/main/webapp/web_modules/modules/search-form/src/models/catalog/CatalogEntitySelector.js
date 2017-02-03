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
    super(['modules.search-form', 'results'])
  }

  getMetaData(state) {
    const plop = this.uncombineStore(state)
    return plop.metadata
  }
}

const instance = new CatalogEntitySelector()
export default instance
