import {BasicSelector} from "@regardsoss/store-utils"


class DatasourceSelectors extends BasicSelector {
  constructor () {
    super(["admin", "data-management", "project"])
  }

  getDatasources (state: any): any {
    return this.uncombineStore(state).items
  }
  getDatasourceById (state: any, id: number): any {
    return this.uncombineStore(state).items[id]
  }

}



export default {
  getDatasources (state: any): any {
    return undefined
  },
  getDatasourceById (state: any, id: number): any {
    return undefined
  },
}
