/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien Binda
 */
class PluginsSelector extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'ui', 'plugin'])
  }
}

const instance = new PluginsSelector()
export default instance
