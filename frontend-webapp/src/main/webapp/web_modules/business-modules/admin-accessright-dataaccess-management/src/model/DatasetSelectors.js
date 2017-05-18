/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class DatasetSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'access-right-management', 'access-rights-management', 'dataset'])
  }
}

const instance = new DatasetSelectors()
export default instance
