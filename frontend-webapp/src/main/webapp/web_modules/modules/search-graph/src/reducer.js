/**
 * LICENSE_PLACEHOLDER
 **/

import CollectionModelReducers, { REDUCER_PATH as COLLECTION_MODEL_PATH } from './model/CollectionModelReducers'
import GraphSelectionReducers, { REDUCER_PATH as GRAPH_SELECTION_PATH } from './model/graph/GraphSelectionReducers'
import GraphLevelCollectionReducers, { REDUCER_PATH as GRAPH_LEVEL_COLLECTION_PATH } from './model/graph/GraphLevelCollectionReducers'
import GraphLevelDatasetReducers, { REDUCER_PATH as GRAPH_LEVEL_DATASET_PATH } from './model/graph/GraphLevelDatasetReducers'

export default {
  [COLLECTION_MODEL_PATH]: CollectionModelReducers,
  [GRAPH_SELECTION_PATH]: GraphSelectionReducers,
  [GRAPH_LEVEL_COLLECTION_PATH]: GraphLevelCollectionReducers,
  [GRAPH_LEVEL_DATASET_PATH]: GraphLevelDatasetReducers,
}
