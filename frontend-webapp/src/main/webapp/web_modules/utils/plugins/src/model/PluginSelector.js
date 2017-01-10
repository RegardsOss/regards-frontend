/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class PluginSelector extends BasicPageableSelectors {

  getPlugins = store => store.common.plugins.items
}

const instance = new PluginSelector()
export default instance
