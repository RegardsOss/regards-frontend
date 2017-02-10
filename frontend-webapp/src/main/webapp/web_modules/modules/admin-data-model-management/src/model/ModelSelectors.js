import { BasicListSelectors } from '@regardsoss/store-utils'

class ModelSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'model-management', 'model'])
  }
}

const instance = new ModelSelectors()
export default instance
