import sortBy from 'lodash/sortBy'
import { BasicArraySelectors } from '@regardsoss/store-utils'

class AttributeModelTypeSelectors extends BasicArraySelectors {
  getArraySortedByType(state) {
    return sortBy(super.getArray(state), type => type)
  }
}

export default storePath => new AttributeModelTypeSelectors(storePath)
