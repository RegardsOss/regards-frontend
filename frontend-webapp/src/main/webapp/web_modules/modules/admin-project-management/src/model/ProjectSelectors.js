import { BasicPageableSelectors } from '@regardsoss/store-utils'

class ProjectSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'project-management', 'project'])
  }
}

const instance = new ProjectSelectors()
export default instance
