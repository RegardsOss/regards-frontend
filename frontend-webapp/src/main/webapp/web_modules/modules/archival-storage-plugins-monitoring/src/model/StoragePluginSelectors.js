/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListSelectors } from '@regardsoss/store-utils'

class StoragePluginSelectors extends BasicListSelectors {
  constructor() {
    super(['modules.archival-storage-plugins-monitoring', 'storage-plugins'])
  }
}


const instance = new StoragePluginSelectors()
export default instance
