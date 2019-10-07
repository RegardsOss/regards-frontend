/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { mainSearchReducer, tagSearchReducer } from './clients/SearchEntitiesClient'
import { DatasetAttributeModelReducer } from './clients/DatasetAttributeModelClient'
import { DataAttributeModelReducer } from './clients/DataobjectAttributeModelClient'
import { mainTableReducer, tagTableReducer } from './clients/TableClient'
import { pluginServiceReducer } from './clients/PluginServiceClient'
import runPluginServiceReducer from './models/services/RunPluginServiceReducer'

/**
 * Reducers for search-results module
 * @author Sébastien binda
 */
const searchResultsReducers = {
  'datasets-attributes': DatasetAttributeModelReducer,
  'dataobjects-attributes': DataAttributeModelReducer,
  mainSearchCatalog: mainSearchReducer,
  tagSearchCatalog: tagSearchReducer,
  mainResultsTable: mainTableReducer,
  tagResultsTable: tagTableReducer,
  // services
  runPluginService: runPluginServiceReducer,
  pluginServices: pluginServiceReducer,
}

export default searchResultsReducers
