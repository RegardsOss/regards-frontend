/**
* LICENSE_PLACEHOLDER
**/
import { BasicPartitionSelectors } from '@regardsoss/store-utils'
import { REDUCER_PATH } from './GraphLevelDatasetReducers'

/**
 * Selector for level datasets in partitions
 */
class GraphLevelDatasetSelectors extends BasicPartitionSelectors {

  getDatasets(state, partitionKey) {
    const data = this.getData(state, partitionKey)
    return data && data.items ? data.items : {}
  }

}

export default new GraphLevelDatasetSelectors(['modules.search-graph', REDUCER_PATH])
