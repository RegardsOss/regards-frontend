/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Redux store Selectors for Layout entities
 * @author Sébastien Binda
 */
class LayoutsSelector extends BasicListSelectors {
  constructor() {
    super(['portal', 'layout'])
  }
}

const instance = new LayoutsSelector()
export default instance
