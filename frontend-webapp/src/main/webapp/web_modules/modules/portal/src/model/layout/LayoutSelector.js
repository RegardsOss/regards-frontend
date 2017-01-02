/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Redux store Selectors for Layout entities
 */
class LayoutsSelector extends BasicListSelectors {
  constructor() {
    super(['portal', 'layout'])
  }
}

const instance = new LayoutsSelector()
export default instance
