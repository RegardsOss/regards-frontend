/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 */
class ModulesSelector extends BasicPageableSelectors {
  constructor() {
    super(['portal', 'modules'])
  }
}

const instance = new ModulesSelector()
export default instance
