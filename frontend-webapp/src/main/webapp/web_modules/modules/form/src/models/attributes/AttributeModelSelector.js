/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 */
class AttributeModelSelector extends BasicPageableSelectors {
  constructor() {
    super(['modules.form', 'attributes'])
  }
}

const instance = new AttributeModelSelector()
export default instance
