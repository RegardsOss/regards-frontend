/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { REDUCER_PATH as attributeModelClientReducerPath, AttributeModelReducer } from './clients/AttributeModelClient'
// User: graph dialog context (selection, collapse, ... all user actions and corresponding state )
import GraphContextReducers, { REDUCER_PATH as GRAPH_CONTEXT_PATH } from './model/graph/GraphContextReducers'
// User : fetch level content
import GraphLevelCollectionReducers, { REDUCER_PATH as GRAPH_LEVEL_COLLECTION_PATH } from './model/graph/GraphLevelCollectionReducers'
import GraphLevelDatasetReducers, { REDUCER_PATH as GRAPH_LEVEL_DATASET_PATH } from './model/graph/GraphLevelDatasetReducers'

export default {
  // Admin
  [COLLECTION_MODEL_PATH]: CollectionModelReducers,
  [attributeModelClientReducerPath]: AttributeModelReducer,
  // User
  [GRAPH_CONTEXT_PATH]: GraphContextReducers,
  [GRAPH_LEVEL_COLLECTION_PATH]: GraphLevelCollectionReducers,
  [GRAPH_LEVEL_DATASET_PATH]: GraphLevelDatasetReducers,
}
