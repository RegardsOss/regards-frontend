/**
* LICENSE_PLACEHOLDER
**/
import { BasicPartitionActions } from '@regardsoss/store-utils'

/**
 * Action to store level collections in partitions
 */
class GraphLevelCollectionActions extends BasicPartitionActions {
  constructor() {
    super({
      namespace: 'search-graph/level/collections',
    })
  }
}

export default new GraphLevelCollectionActions()
