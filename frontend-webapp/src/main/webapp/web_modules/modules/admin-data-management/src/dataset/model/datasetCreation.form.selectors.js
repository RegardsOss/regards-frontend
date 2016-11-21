import BasicSelector from '@regardsoss/store-utils'

class DatasetCreationFormSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'data-management', 'dataset-form'])
  }

  getViewState(state) {
    return this.uncombineStore(state).viewState
  }


}

const instance = new DatasetCreationFormSelectors()

export default instance

