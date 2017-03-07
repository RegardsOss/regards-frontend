import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { reducerPath } from './AccessGroupReducers'

class AccessGroupSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'user-management', 'project-user-management', reducerPath])
  }
}

const instance = new AccessGroupSelectors()
export default instance

