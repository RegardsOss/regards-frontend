/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'
import { find } from 'lodash'

class ModelAttributeFragmentSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'model-attribute-management', 'model-attribute-fragment'])
  }
}

const instance = new ModelAttributeFragmentSelectors()
export default instance
