/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

class ModelAttributeSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'collection', 'model-attribute'])
  }
}

const instance = new ModelAttributeSelectors()
export default instance
