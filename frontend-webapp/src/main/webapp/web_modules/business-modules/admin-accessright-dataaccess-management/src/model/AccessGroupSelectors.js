/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class AccessGroupSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'access-right-management', 'access-rights-management', 'access-group'])
  }
}

const instance = new AccessGroupSelectors()
export default instance

