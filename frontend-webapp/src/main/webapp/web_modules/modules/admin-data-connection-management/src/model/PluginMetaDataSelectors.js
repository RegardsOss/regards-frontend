/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class PluginMetaDataSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'data-management', 'connection', 'plugin-meta-data'])
  }
}

const instance = new PluginMetaDataSelectors()
export default instance
