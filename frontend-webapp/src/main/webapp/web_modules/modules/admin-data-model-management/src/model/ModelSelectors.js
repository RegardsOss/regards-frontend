import { BasicListSelectors } from '@regardsoss/store-utils'

class ProjectSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'model-management', 'model'])
  }
}

const instance = new ProjectSelectors()
export default instance
