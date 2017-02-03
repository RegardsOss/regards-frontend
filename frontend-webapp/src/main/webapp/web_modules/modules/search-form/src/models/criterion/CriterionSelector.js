/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien binda
 */
class CriterionSelector extends BasicPageableSelectors {
  constructor() {
    super(['modules.search-form', 'criterion'])
  }
}

const instance = new CriterionSelector()
export default instance
