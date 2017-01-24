/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListSelectors } from '@regardsoss/store-utils'

class AIPStatusMonitoringSelectors extends BasicListSelectors {
  constructor() {
    super(['modules.archival-storage-aip-status', 'aip'])
  }
}


const instance = new AIPStatusMonitoringSelectors()
export default instance
