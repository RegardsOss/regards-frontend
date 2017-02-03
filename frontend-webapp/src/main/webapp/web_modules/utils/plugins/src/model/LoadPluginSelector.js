/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Selector for plugins from redux store
 * @author Sébastien Binda
 */
class PluginSelector extends BasicSelector {

  getPlugins = store => store.common.plugins.loadedPlugins

  getPluginBySourcesPath = (path, store) => store.common.plugins.loadedPlugins[path]
}

const instance = new PluginSelector()
export default instance
