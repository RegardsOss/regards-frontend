/**
 * LICENSE_PLACEHOLDER
 **/

// Admin : available collection models
import CollectionModelReducers, { REDUCER_PATH as COLLECTION_MODEL_PATH } from './model/CollectionModelReducers'
// Admin: available attributes
import attributeModelClient from './model/client/AttributeModelClient'
// User: graph dialog context (selection, collapse, ... all user actions and corresponding state )
import GraphContextReducers, { REDUCER_PATH as GRAPH_CONTEXT_PATH } from './model/graph/GraphContextReducers'
// User : fetch level content
import GraphLevelCollectionReducers, { REDUCER_PATH as GRAPH_LEVEL_COLLECTION_PATH } from './model/graph/GraphLevelCollectionReducers'
import GraphLevelDatasetReducers, { REDUCER_PATH as GRAPH_LEVEL_DATASET_PATH } from './model/graph/GraphLevelDatasetReducers'
// User: fetch entity description (for both dataset and collection)
import DownloadDescriptionClient, { DATASET_REDUCER_PATH, COLLECTION_REDUCER_PATH } from './model/client/DownloadDescriptionClient'
// User: fetch attributes for model id
import modelAttributeClient from './model/client/ModelAttributeClient'


export default {
  // Admin
  [COLLECTION_MODEL_PATH]: CollectionModelReducers,
  [attributeModelClient.REDUCER_PATH]: attributeModelClient.reduce,
  // User
  [GRAPH_CONTEXT_PATH]: GraphContextReducers,
  [GRAPH_LEVEL_COLLECTION_PATH]: GraphLevelCollectionReducers,
  [GRAPH_LEVEL_DATASET_PATH]: GraphLevelDatasetReducers,
  [DATASET_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadDatasetDescription,
  [COLLECTION_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadCollectionDescription,
  [modelAttributeClient.REDUCER_PATH]: modelAttributeClient.reduce,
}
