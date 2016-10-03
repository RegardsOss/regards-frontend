import {BasicSelector} from "@regardsoss/store-utils"

class ProjectSelectors extends BasicSelector {
  constructor () {
    super(["admin", "project-management", "project"])
  }

  getProjects (state: any): any {
    return this.uncombineStore(state).items
  }
  getProjectById (state: any, id: string): any {
    return this.uncombineStore(state).items[id]
  }

}

const _instance = new ProjectSelectors()
export default _instance
