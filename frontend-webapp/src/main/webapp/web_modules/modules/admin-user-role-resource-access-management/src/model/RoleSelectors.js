import { BasicListSelectors } from '@regardsoss/store-utils'

class RoleSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'user-management', 'role-resource-access-management', 'role'])
  }
}

const instance = new RoleSelectors()
export default instance
