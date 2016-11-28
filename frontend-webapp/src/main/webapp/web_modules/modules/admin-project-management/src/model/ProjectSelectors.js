import BasicSelector from '@regardsoss/store-utils'

class ProjectSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'project-management', 'project'])
  }

  getList(state) {
    return this.uncombineStore(state).items
  }
  getById(state, projectName) {
    return this.uncombineStore(state).items[projectName]
  }

}

const instance = new ProjectSelectors()
export default instance
