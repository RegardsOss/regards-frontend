/**
 * LICENSE_PLACEHOLDER
 **/
import navigationContextReducer from './models/navigation/NavigationContextReducer'
import datasetServicesReducer from './models/services/DatasetServicesReducer'
import { reducer as SearchCatalogReducer } from './clients/SearchEntitiesClient'
import { AttributeModelReducer, REDUCER_PATH as ATTRIBUTE_MODEL_REDUCER_PATH } from './clients/AttributeModelClient'
import { tableReducer } from './clients/TableClient'
import DownloadDescriptionClient, { DATASET_REDUCER_PATH, COLLECTION_REDUCER_PATH } from './clients/DownloadDescriptionClient'
import modelAttributeClient from './clients/ModelAttributeClient'
import OneDatasetBusinessServiceClient from './clients/OneDatasetBusinessServiceClient'
import OneDataobjectBusinessServiceClient from './clients/OneDataobjectBusinessServiceClient'
import ManyDataobjectsBusinessServiceClient from './clients/ManyDataobjectsBusinessServiceClient'
import UIServiceClient from './clients/UIServiceClient'

/**
 * Reducers for searc-form module
 * @type {{attributes: ((p1?:*, p2?:*)), datasets: ((p1?:*, p2?:*)), models: ((p1?:*, p2?:*)), criterion: ((p1?:*, p2?:*)), results: ((p1?:*, p2?:*))}}
 * @author Sébastien binda
 */
const searchResultsReducers = {
  [ATTRIBUTE_MODEL_REDUCER_PATH]: AttributeModelReducer,
  searchCatalog: SearchCatalogReducer,
  resultsTable: tableReducer,
  // context
  navigationContext: navigationContextReducer,
  // description
  [DATASET_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadDatasetDescription,
  [COLLECTION_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadCollectionDescription,
  [modelAttributeClient.REDUCER_PATH]: modelAttributeClient.ModelAttributesReducer,
  // services
  datasetServices: datasetServicesReducer,
  'business-services-one-dataset': OneDatasetBusinessServiceClient.reducer,
  'business-services-one-dataobject': OneDataobjectBusinessServiceClient.reducer,
  'business-services-many-dataobjects': ManyDataobjectsBusinessServiceClient.reducer,
  'ui-services': UIServiceClient.reducer,
}

export default searchResultsReducers
