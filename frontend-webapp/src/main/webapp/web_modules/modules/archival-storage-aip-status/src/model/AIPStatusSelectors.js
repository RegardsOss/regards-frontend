/**
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class AIPStatusSelectors extends BasicPageableSelectors {
  constructor() {
    super(['modules.archival-storage-aip-status', 'aip'])
  }
}


const instance = new AIPStatusSelectors()
export default instance
