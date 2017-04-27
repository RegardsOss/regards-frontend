/**
* LICENSE_PLACEHOLDER
**/
import { BasicPartitionSelectors } from '@regardsoss/store-utils'
import { REDUCER_PATH } from './GraphLevelCollectionReducers'

/**
 * Selector for level collections in partitions
 */
class GraphLevelCollectionsSelectors extends BasicPartitionSelectors {

  getCollections(state, partitionKey) {
    const data = this.getData(state, partitionKey)
    return data && data.items ? data.items : {}
  }

}

export default new GraphLevelCollectionsSelectors(['modules.search-graph', REDUCER_PATH])
