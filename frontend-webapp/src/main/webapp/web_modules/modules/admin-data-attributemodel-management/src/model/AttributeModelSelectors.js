import { BasicListSelectors } from '@regardsoss/store-utils'

class AttributeModelSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'attribute-model-management', 'attribute-model'])
  }
}

const instance = new AttributeModelSelectors()
export default instance
