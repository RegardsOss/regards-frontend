/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien binda
 */
class ModulesSelector extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'ui', 'module', 'module'])
  }
}


const instance = new ModulesSelector()
export default instance
