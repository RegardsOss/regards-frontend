/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

// Admin : available collection models
import CollectionModelReducers, { REDUCER_PATH as COLLECTION_MODEL_PATH } from './model/CollectionModelReducers'
// Admin: available attributes
import attributeModelClient from './clients/AttributeModelClient'
// User: graph dialog context (selection, collapse, ... all user actions and corresponding state )
import GraphContextReducers, { REDUCER_PATH as GRAPH_CONTEXT_PATH } from './model/graph/GraphContextReducers'
// User: description level model
import { descriptionLevelReducer } from './model/description/DescriptionLevelModel'
// User : fetch level content
import GraphLevelCollectionReducers, { REDUCER_PATH as GRAPH_LEVEL_COLLECTION_PATH } from './model/graph/GraphLevelCollectionReducers'
import GraphLevelDatasetReducers, { REDUCER_PATH as GRAPH_LEVEL_DATASET_PATH } from './model/graph/GraphLevelDatasetReducers'
// User: fetch entity description (for both dataset and collection)
import DownloadDescriptionClient, { DATASET_REDUCER_PATH, COLLECTION_REDUCER_PATH } from './clients/DownloadDescriptionClient'
// User: fetch attributes for model id
import modelAttributeClient from './clients/ModelAttributeClient'


module.exports = {
  // Admin
  [COLLECTION_MODEL_PATH]: CollectionModelReducers,
  [attributeModelClient.REDUCER_PATH]: attributeModelClient.AttributeModelReducer,
  // User
  [GRAPH_CONTEXT_PATH]: GraphContextReducers,
  descriptionLevel: descriptionLevelReducer,
  [GRAPH_LEVEL_COLLECTION_PATH]: GraphLevelCollectionReducers,
  [GRAPH_LEVEL_DATASET_PATH]: GraphLevelDatasetReducers,
  [DATASET_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadDatasetDescription,
  [COLLECTION_REDUCER_PATH]: DownloadDescriptionClient.reduceDownloadCollectionDescription,
  [modelAttributeClient.REDUCER_PATH]: modelAttributeClient.ModelAttributesReducer,
}
