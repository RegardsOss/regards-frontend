import { BasicSelector } from '@regardsoss/store-utils'

class ProjectAccountSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'user-management', 'project-account'])
  }

  getProjectAccounts(state) {
    return this.uncombineStore(state).items
  }
  getProjectAccountById(state, id) {
    return this.uncombineStore(state).items[id]
  }

}

const instance = new ProjectAccountSelectors()
export default instance
