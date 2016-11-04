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


export default {
  getDatasources(state) {
    return undefined
  },
  getDatasourceById(state, id) {
    return undefined
  },
}
