import { BasicListSelectors } from '@regardsoss/store-utils'

class ProjectSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'project-management', 'project'])
  }
}

const instance = new ProjectSelectors()
export default instance
