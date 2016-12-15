import { BasicPageableSelectors } from '@regardsoss/store-utils'

class ProjectUserSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'user-management', 'project-user-management', 'project-user'])
  }
}

const instance = new ProjectUserSelectors()
export default instance
