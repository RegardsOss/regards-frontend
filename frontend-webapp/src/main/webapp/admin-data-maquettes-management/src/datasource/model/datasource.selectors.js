import { BasicSelector } from '@regardsoss/store-utils'

// Selectors
export const getDatasets = state => state.items

class DatasourceSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'data-management', 'datasource'])
  }

  getDatasources(state) {
    return this.uncombineStore(state).items
  }
  getDatasourceById(state, id) {
    return this.uncombineStore(state).items[id]
  }

}


const instance = new DatasourceSelectors()
export default instance
