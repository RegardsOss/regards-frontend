/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Selector for plugins from redux store
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
class PluginSelector extends BasicListSelectors {
  constructor() {
    super(['common', 'plugins', 'loadedPlugins'])
  }
}

const instance = new PluginSelector()
export default instance
