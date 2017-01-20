/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListSelectors } from '@regardsoss/store-utils'

class StorageMonitoringSelectors extends BasicListSelectors {
  constructor(application) {
    super([application, 'modules', 'archival-storage-plugins-monitoring.storage-plugins'])
  }
}

export default app => new StorageMonitoringSelectors(app)
