import BasicSelector  from '@regardsoss/store-utils'


class DatasourceSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'data-management', 'project'])
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
