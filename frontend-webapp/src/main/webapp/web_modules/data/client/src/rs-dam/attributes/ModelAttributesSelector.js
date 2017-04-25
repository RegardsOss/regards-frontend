/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'
import find from 'lodash/find'

/**
 * Store selector to access association model to attribute model
 */
class ModelAttributesSelector extends BasicListSelectors {

  getByAttributeModelId(state, attributeModelId) {
    return find(this.uncombineStore(state).items, modelAttribute => modelAttribute.content.attribute.id === attributeModelId)
  }

}

export default storePathArray => new ModelAttributesSelector(storePathArray)

