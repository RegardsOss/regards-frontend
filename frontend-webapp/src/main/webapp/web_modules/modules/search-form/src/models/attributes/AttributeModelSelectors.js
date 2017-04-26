/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien binda
 */
class AttributeModelSelectors extends BasicPageableSelectors {
  constructor() {
    super(['modules.search-form', 'attributes'])
  }
}

const instance = new AttributeModelSelectors()
export default instance
