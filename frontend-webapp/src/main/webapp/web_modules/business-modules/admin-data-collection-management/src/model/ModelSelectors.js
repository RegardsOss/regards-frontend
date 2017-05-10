import { BasicListSelectors } from '@regardsoss/store-utils'

class ProjectSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'collection', 'model'])
  }
}

const instance = new ProjectSelectors()
export default instance
