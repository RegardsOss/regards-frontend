/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien Binda
 */
class ModulesSelector extends BasicPageableSelectors {
  constructor() {
    super(['portal', 'layout.modules'])
  }
}

const instance = new ModulesSelector()
export default instance
