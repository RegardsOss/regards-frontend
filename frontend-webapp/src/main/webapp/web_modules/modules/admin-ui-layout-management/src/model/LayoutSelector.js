/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store Selectors for Layout entities
 * @author Sébastien binda
 */
class LayoutsSelector extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'ui', 'layout'])
  }
}



const instance = new LayoutsSelector()
export default instance
