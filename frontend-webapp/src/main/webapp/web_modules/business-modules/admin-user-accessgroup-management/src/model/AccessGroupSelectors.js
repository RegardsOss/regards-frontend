import { BasicPageableSelectors } from '@regardsoss/store-utils'

class AccessGroupSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'user-management', 'access-group', 'access-group'])
  }
}

const instance = new AccessGroupSelectors()
export default instance

