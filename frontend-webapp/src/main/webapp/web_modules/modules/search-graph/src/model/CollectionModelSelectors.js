/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'
import { REDUCER_PATH } from './CollectionModelReducers'

class CollectionModelSelectors extends BasicListSelectors {
  constructor() {
    super(['modules.search-graph', REDUCER_PATH])
  }
}

export default new CollectionModelSelectors()
