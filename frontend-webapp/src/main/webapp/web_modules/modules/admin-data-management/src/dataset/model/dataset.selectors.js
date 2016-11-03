import BasicSelector from '@regardsoss/store-utils'

class DatasetSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'data-management', 'dataset'])
  }

  getDatasets(state) {
    return this.uncombineStore(state).items
  }

}

const instance = new DatasetSelectors()
export default instance
