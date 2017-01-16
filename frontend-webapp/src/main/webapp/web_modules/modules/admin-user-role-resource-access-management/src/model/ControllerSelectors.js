import { BasicArraySelectors } from '@regardsoss/store-utils'

class ControllerSelectors extends BasicArraySelectors {
  constructor() {
    super(['admin', 'user-management', 'role-resource-access-management', 'controller'])
  }
}

const instance = new ControllerSelectors()
export default instance
