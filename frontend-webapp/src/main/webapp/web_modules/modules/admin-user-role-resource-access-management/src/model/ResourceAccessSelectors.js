import { BasicPageableSelectors } from '@regardsoss/store-utils'

class ResourceAccessSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'user-management', 'role-resource-access-management', 'resource-access'])
  }
}

const instance = new ResourceAccessSelectors()
export default instance
