import { BasicArraySelectors } from '@regardsoss/store-utils'

class AttributeModelSelectors extends BasicArraySelectors {
  constructor() {
    super(['admin', 'data-management', 'attribute-model-management', 'attribute-model-restriction'])
  }
}

const instance = new AttributeModelSelectors()
export default instance
