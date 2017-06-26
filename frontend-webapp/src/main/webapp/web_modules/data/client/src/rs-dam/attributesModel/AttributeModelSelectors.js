/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { DEFAULT_FRAGMENT } from '@regardsoss/domain/dam'
/**
 * Store selector to Attribute entities.
 * @author Léo Mieulet
 */
class AttributeModelSelectors extends BasicListSelectors {

  /**
   * Return an array containing all attributes ordered by their fragment and their name
   * Attributes on the default fragment are at the end of the result
   * @param state
   * @returns {[*,*]}
   */
  getArrayOrderedUsingFragmentAndAttributeName(state) {
    const modelAttributeList = this.getList(state)
    const modelAttributeListPartition = partition(modelAttributeList, ['content.fragment.name', DEFAULT_FRAGMENT])
    return [
      // add first attributes that are not in the DEFAULT_FRAGMENT
      ...orderBy(modelAttributeListPartition[1], ['content.fragment.name', 'content.name'], ['asc', 'asc']),
      // then display attributes from the DEFAULT_FRAGMENT
      ...orderBy(modelAttributeListPartition[0], ['content.name'], ['asc']),
    ]
  }
}

export default storePath => new AttributeModelSelectors(storePath)

