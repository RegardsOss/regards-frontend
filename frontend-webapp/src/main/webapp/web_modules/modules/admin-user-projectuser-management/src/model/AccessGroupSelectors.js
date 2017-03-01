import { BasicPageableSelectors } from '@regardsoss/store-utils'

class AccessGroupSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'user-management', 'project-user-management', 'accessgroup'])
  }
}

const instance = new AccessGroupSelectors()
export default instance

