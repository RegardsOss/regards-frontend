import { BasicPaegableSelectors } from '@regardsoss/store-utils'

class ProjectSelectors extends BasicPaegableSelectors {
  constructor() {
    super(['admin', 'project-management', 'project'])
  }
}

const instance = new ProjectSelectors()
export default instance
