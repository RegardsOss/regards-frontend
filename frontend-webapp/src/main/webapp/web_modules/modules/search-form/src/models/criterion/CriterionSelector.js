/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 */
class CriterionSelector extends BasicPageableSelectors {
  constructor() {
    super(['modules.search-form', 'criterion'])
  }
}

const instance = new CriterionSelector()
export default instance
