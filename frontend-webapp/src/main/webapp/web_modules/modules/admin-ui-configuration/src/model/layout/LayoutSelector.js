/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Redux store Selectors for Layout entities
 * @author Sébastien binda
 */
class LayoutsSelector extends BasicListSelectors {
  constructor() {
    super(['admin', 'ui-configuration', 'layout'])
  }
}

const instance = new LayoutsSelector()
export default instance
