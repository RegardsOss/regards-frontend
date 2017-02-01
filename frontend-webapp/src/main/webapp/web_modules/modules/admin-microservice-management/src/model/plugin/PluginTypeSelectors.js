/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Redux selector for retrieving the array of plugin types from the store.
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginTypeSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'microservice-management', 'pluginType'])
  }
}

const instance = new PluginTypeSelectors()
export default instance
