/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class DatasetSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'access-right', 'dataset'])
  }
}

const instance = new DatasetSelectors()
export default instance
