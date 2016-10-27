import { BasicSelector } from '@regardsoss/store-utils';

class ModelSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'data-management', 'model']);
  }

  getDatasetModels(state) {
    return this.uncombineStore(state).items;
  }

  getDatasetModelById(state, id) {
    return this.uncombineStore(state).items[id];
  }

}

export default new ModelSelectors();
