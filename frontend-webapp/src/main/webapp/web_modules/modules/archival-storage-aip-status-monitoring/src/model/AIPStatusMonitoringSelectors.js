/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListSelectors } from '@regardsoss/store-utils'

class StorageMonitoringSelectors extends BasicListSelectors {
  constructor() {
    super(['micro-service', 'archival-storage-plugins-monitoring', 'storage-monitoring'])
  }
}

const instance = new StorageMonitoringSelectors()
export default instance
