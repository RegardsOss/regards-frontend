/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListSelectors } from '@regardsoss/store-utils'

class StorageMonitoringSelectors extends BasicListSelectors {
  constructor() {
    super(['modules.archival-storage-plugins-monitoring','storage-plugins'])
  }
}

export default StorageMonitoringSelectors
