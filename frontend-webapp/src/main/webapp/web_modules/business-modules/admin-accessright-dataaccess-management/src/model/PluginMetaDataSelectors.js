/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class PluginMetaDataSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'access-right-management', 'access-rights-management', 'plugin-meta-data'])
  }
}

const instance = new PluginMetaDataSelectors()
export default instance
