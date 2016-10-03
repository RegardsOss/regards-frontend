import {BasicSelector} from "@regardsoss/store-utils"

// Selectors
export const getDatasets = (state: any) => state.items

class DatasourceSelectors extends BasicSelector {
  constructor () {
    super(["admin", "data-management", "datasource"])
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
