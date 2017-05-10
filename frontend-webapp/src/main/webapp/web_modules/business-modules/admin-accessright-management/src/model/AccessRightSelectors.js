/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class AccessRightSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'access-right', 'access-right'])
  }
}

const instance = new AccessRightSelectors()
export default instance
