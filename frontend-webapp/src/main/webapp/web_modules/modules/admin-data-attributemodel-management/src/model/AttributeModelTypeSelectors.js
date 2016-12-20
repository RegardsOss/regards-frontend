import { BasicArraySelectors } from '@regardsoss/store-utils'

class AttributeModelTypeSelectors extends BasicArraySelectors {
  constructor() {
    super(['admin', 'data-management', 'attribute-model-management', 'attribute-model-type'])
  }
}

const instance = new AttributeModelTypeSelectors()
export default instance
