/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import navigationContextReducer from './models/navigation/NavigationContextReducer'
import { reducer as SearchCatalogReducer } from './clients/SearchEntitiesClient'
import { AttributeModelReducer, REDUCER_PATH as ATTRIBUTE_MODEL_REDUCER_PATH } from './clients/AttributeModelClient'
import {
  AttributeModelReducer as DatasetAttributeModelReducer,
  REDUCER_PATH as DATASET_ATTRIBUTE_MODEL_REDUCER_PATH,
} from './clients/DatasetAttributeModelClient'
import {
  AttributeModelReducer as DataobjectAttributeModelReducer,
  REDUCER_PATH as DATAOBJECT_ATTRIBUTE_MODEL_REDUCER_PATH,
} from './clients/DataobjectAttributeModelClient'
import { tableReducer } from './clients/TableClient'
import DownloadDescriptionClient, { DATASET_REDUCER_PATH, COLLECTION_REDUCER_PATH } from './clients/DownloadDescriptionClient'
import { descriptionLevelReducer } from './models/description/DescriptionLevelModel'
import modelAttributeClient from './clients/ModelAttributeClient'
import pluginServiceClient from './clients/PluginServiceClient'
import runPluginServiceReducer from './models/services/RunPluginServiceReducer'

/**
 * Reducers for search-results module
 * @author Sébastien binda
 */
const searchResultsReducers = {
  [ATTRIBUTE_MODEL_REDUCER_PATH]: AttributeModelReducer,
  [DATASET_ATTRIBUTE_MODEL_REDUCER_PATH]: DatasetAttributeModelReducer,
  [DATAOBJECT_ATTRIBUTE_MODEL_REDUCER_PATH]: DataobjectAttributeModelReducer,
  searchCatalog: SearchCatalogReducer,
  resultsTable: tableReducer,
  // context
  navigationContext: navigationContextReducer,
  // description
  descriptionLevel: descriptionLevelReducer,
  [DATASET_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadDatasetDescription,
  [COLLECTION_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadCollectionDescription,
  [modelAttributeClient.REDUCER_PATH]: modelAttributeClient.ModelAttributesReducer,
  // services
  runPluginService: runPluginServiceReducer,
  pluginServices: pluginServiceClient.pluginServiceReducer,
}

export default searchResultsReducers
