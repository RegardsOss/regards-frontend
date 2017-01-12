/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class RoleSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'user-management', 'role-management', 'role'])
  }
}

const instance = new RoleSelectors()
export default instance
