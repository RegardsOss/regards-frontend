import { BasicListSelectors } from '@regardsoss/store-utils'

class RoleSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'user-management', 'project-user-management', 'role'])
  }
}

const instance = new RoleSelectors()
export default instance
