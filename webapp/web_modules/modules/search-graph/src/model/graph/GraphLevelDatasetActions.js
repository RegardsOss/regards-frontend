/**
* LICENSE_PLACEHOLDER
**/
import { BasicPartitionActions } from '@regardsoss/store-utils'

/**
 * Action to store level datasets in partitions
 */
class GraphLevelDatasetActions extends BasicPartitionActions {
  constructor() {
    super({
      namespace: 'search-graph/level/dataset',
    })
  }
}

export default new GraphLevelDatasetActions()
