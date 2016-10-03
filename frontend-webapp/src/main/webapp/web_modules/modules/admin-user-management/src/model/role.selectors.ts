import {BasicSelector} from "@regardsoss/store-utils"

class RoleSelectors extends BasicSelector {
  constructor () {
    super(["admin", "user-management", "project-account"])
  }

  getRoles (state: any): any {
    return this.uncombineStore(state).items
  }
  getRolesById (state: any, id: string): any {
    return this.uncombineStore(state).items[id]
  }

}

const _instance = new RoleSelectors()
export default _instance
