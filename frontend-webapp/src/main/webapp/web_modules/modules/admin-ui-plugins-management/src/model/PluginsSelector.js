/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 */
class PluginsSelector extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'ui-plugins-management', 'plugins'])
  }
}

const instance = new PluginsSelector()
export default instance
