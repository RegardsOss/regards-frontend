/**
* LICENSE_PLACEHOLDER
**/
import { EntityConfiguration } from '@regardsoss/api'
import { BasicPartitionReducers, entityListPartitionDataHandler } from '@regardsoss/store-utils'
import GraphLevelCollectionActions from './GraphLevelCollectionActions'

/**
 * Graph level partition action reducers for collections
 */
class GraphLevelCollectionReducers extends BasicPartitionReducers {

  constructor() {
    super(GraphLevelCollectionActions, entityListPartitionDataHandler(EntityConfiguration.normalizrKey))
  }

}
const instance = new GraphLevelCollectionReducers()
export default (state, action) => instance.reduce(state, action)
export const REDUCER_PATH = 'level-collections'
