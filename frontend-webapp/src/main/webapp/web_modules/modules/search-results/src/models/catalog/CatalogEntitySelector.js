/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien binda
 */
class CatalogEntitySelector extends BasicFacetsPageableSelectors {
  constructor() {
    super(['modules.search-results', 'results'])
  }

}

const instance = new CatalogEntitySelector()
export default instance
