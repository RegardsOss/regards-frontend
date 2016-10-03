import {BasicSelector} from "@regardsoss/store-utils"

class ProjectAccountSelectors extends BasicSelector {
  constructor () {
    super(["admin", "user-management", "project-account"])
  }

  getProjectAccounts (state: any): any {
    return this.uncombineStore(state).items
  }
  getProjectAccountById (state: any, id: string): any {
    return this.uncombineStore(state).items[id]
  }

}

const _instance = new ProjectAccountSelectors()
export default _instance
