/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

class AttributeModelSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'model-attribute-management', 'attribute-model'])
  }
}

const instance = new AttributeModelSelectors()
export default instance
