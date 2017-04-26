/**
 * LICENSE_PLACEHOLDER
 **/
import { AttributeModelReducer, REDUCER_PATH as ATTRIBUTE_MODEL_REDUCER_PATH } from './models/client/AttributeModelClient'
import CatalogEntityReducer from './models/catalog/CatalogEntityReducer'
// User: fetch entity description (for both dataset and collection)
import DownloadDescriptionClient, { DATASET_REDUCER_PATH, COLLECTION_REDUCER_PATH } from './models/client/DownloadDescriptionClient'
// User: fetch attributes for model id
import modelAttributeClient from './models/client/ModelAttributeClient'

/**
 * Reducers for searc-form module
 * @type {{attributes: ((p1?:*, p2?:*)), datasets: ((p1?:*, p2?:*)), models: ((p1?:*, p2?:*)), criterion: ((p1?:*, p2?:*)), results: ((p1?:*, p2?:*))}}
 * @author Sébastien binda
 */
const searchResultsReducers = {
  [ATTRIBUTE_MODEL_REDUCER_PATH]: AttributeModelReducer,
  results: CatalogEntityReducer,
  [DATASET_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadDatasetDescription,
  [COLLECTION_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadCollectionDescription,
  [modelAttributeClient.REDUCER_PATH]: modelAttributeClient.ModelAttributesReducer,
}

export default searchResultsReducers
