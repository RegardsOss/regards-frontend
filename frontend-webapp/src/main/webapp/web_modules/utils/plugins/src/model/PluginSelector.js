/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Selector for plugins from redux store
 */
class PluginSelector extends BasicSelector {

  getPlugins = store => store.common.plugins

  getPluginByName = (name, store) => {
    console.log('Search', name, store.common)
    return store.common.plugins[name]
  }
}

const instance = new PluginSelector()
export default instance
