import { BasicListSelectors } from '@regardsoss/store-utils'

class ResourceAccessSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'user-management', 'role-resource-access-management', 'resource-access'])
  }
}

const instance = new ResourceAccessSelectors()
export default instance
