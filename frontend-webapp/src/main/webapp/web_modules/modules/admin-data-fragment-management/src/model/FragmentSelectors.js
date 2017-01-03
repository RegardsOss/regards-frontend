import { BasicListSelectors } from '@regardsoss/store-utils'

class FragmentSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'attribute-model-management', 'fragment'])
  }
}

const instance = new FragmentSelectors()
export default instance
