/**
 * LICENSE_PLACEHOLDER
 **/

import { AttributeModelReducer, REDUCER_PATH as ATTRIBUTE_MODEL_REDUCER_PATH } from './model/client/AttributeModelClient'
import CollectionModelReducers, { REDUCER_PATH as COLLECTION_MODEL_PATH } from './model/CollectionModelReducers'
import GraphContextReducers, { REDUCER_PATH as GRAPH_CONTEXT_PATH } from './model/graph/GraphContextReducers'
import GraphLevelCollectionReducers, { REDUCER_PATH as GRAPH_LEVEL_COLLECTION_PATH } from './model/graph/GraphLevelCollectionReducers'
import GraphLevelDatasetReducers, { REDUCER_PATH as GRAPH_LEVEL_DATASET_PATH } from './model/graph/GraphLevelDatasetReducers'


export default {
  [ATTRIBUTE_MODEL_REDUCER_PATH]: AttributeModelReducer,
  [COLLECTION_MODEL_PATH]: CollectionModelReducers,
  [GRAPH_CONTEXT_PATH]: GraphContextReducers,
  [GRAPH_LEVEL_COLLECTION_PATH]: GraphLevelCollectionReducers,
  [GRAPH_LEVEL_DATASET_PATH]: GraphLevelDatasetReducers,
}
