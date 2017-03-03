/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListSelectors } from '@regardsoss/store-utils'

class AccessesSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'user-management', 'project-user-management', 'accesses'])
  }
}

const instance = new AccessesSelectors()
export default instance
