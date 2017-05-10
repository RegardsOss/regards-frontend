/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Redux store Selectors for Layout entities
 */
class LayoutsSelector extends BasicListSelectors {
  constructor() {
    super(['user', 'layout'])
  }

}

const instance = new LayoutsSelector()
export default instance
