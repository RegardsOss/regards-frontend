/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListSelectors } from '@regardsoss/store-utils'
import { reducerPath } from './RoleReducers'

class RoleSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'user-management', 'project-user-management', reducerPath])
  }
}

const instance = new RoleSelectors()
export default instance
