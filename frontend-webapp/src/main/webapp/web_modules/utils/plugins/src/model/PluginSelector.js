/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien Binda
 */
class CriterionSelector extends BasicPageableSelectors {
  constructor() {
    super(['common', 'plugins', 'plugins'])
  }
}

const instance = new CriterionSelector()
export default instance
