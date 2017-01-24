/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'
import { find } from 'lodash'

class ModelAttributeSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'model-attribute-management', 'model-attribute'])
  }

  getByAttributeModelId(state, attributeModelId) {
    return find(this.uncombineStore(state).items, modelAttribute => modelAttribute.content.attribute.id === attributeModelId)
  }
}

const instance = new ModelAttributeSelectors()
export default instance
