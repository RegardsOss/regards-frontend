/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien binda
 */
class AttributeModelSelector extends BasicPageableSelectors {
  constructor() {
    super(['modules.search-form', 'attributes'])
  }
}

const instance = new AttributeModelSelector()
export default instance
