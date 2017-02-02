/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 */
class CatalogEntitySelector extends BasicPageableSelectors {
  constructor() {
    super(['modules.search-form', 'results'])
  }
}

const instance = new CatalogEntitySelector()
export default instance
