/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 */
class ModelAttributeSelector extends BasicPageableSelectors {
  constructor() {
    super(['modules.form', 'attributes'])
  }
}

const instance = new ModelAttributeSelector()
export default instance
