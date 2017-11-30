/**
* LICENSE_PLACEHOLDER
**/
import { EntityConfiguration } from '@regardsoss/api'
import { BasicPartitionReducers, entityListPartitionDataHandler } from '@regardsoss/store-utils'
import GraphLevelDatasetActions from './GraphLevelDatasetActions'

/**
 * Graph level partition action reducers for datasets
 */
class GraphLevelDatasetReducers extends BasicPartitionReducers {
  constructor() {
    super(GraphLevelDatasetActions, entityListPartitionDataHandler(EntityConfiguration.normalizrKey))
  }
}
const instance = new GraphLevelDatasetReducers()
export default (state, action) => instance.reduce(state, action)
export const REDUCER_PATH = 'level-datasets'

