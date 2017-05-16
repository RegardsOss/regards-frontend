/**
 * LICENSE_PLACEHOLDER
 **/
import { AttributeModelReducer, REDUCER_PATH as ATTRIBUTE_MODEL_REDUCER_PATH } from './client/AttributeModelClient'
import CatalogEntityReducer from './models/catalog/CatalogEntityReducer'
import navigationContextReducer from './models/navigation/NavigationContextReducer'
// User: fetch entity description (for both dataset and collection)
import DownloadDescriptionClient, { DATASET_REDUCER_PATH, COLLECTION_REDUCER_PATH } from './client/DownloadDescriptionClient'
// User: fetch attributes for model id
import modelAttributeClient from './client/ModelAttributeClient'
import OneDatasetBusinessServiceClient from './client/OneDatasetBusinessServiceClient'
import OneDataobjectBusinessServiceClient from './client/OneDataobjectBusinessServiceClient'
import ManyDataobjectsBusinessServiceClient from './client/ManyDataobjectsBusinessServiceClient'
import UIServiceClient from './client/UIServiceClient'

/**
 * Reducers for searc-form module
 * @type {{attributes: ((p1?:*, p2?:*)), datasets: ((p1?:*, p2?:*)), models: ((p1?:*, p2?:*)), criterion: ((p1?:*, p2?:*)), results: ((p1?:*, p2?:*))}}
 * @author Sébastien binda
 */
const searchResultsReducers = {
  [ATTRIBUTE_MODEL_REDUCER_PATH]: AttributeModelReducer,
  results: CatalogEntityReducer,
  // context
  navigationContext: navigationContextReducer,
  // description
  [DATASET_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadDatasetDescription,
  [COLLECTION_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadCollectionDescription,
  [modelAttributeClient.REDUCER_PATH]: modelAttributeClient.ModelAttributesReducer,
  // services
  'business-services-one-dataset': OneDatasetBusinessServiceClient.reducer,
  'business-services-one-dataobject': OneDataobjectBusinessServiceClient.reducer,
  'business-services-many-dataobjects': ManyDataobjectsBusinessServiceClient.reducer,
  'ui-services': UIServiceClient.reducer,
}

export default searchResultsReducers
