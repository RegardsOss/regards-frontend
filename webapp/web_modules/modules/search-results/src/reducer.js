/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { datasetReducer } from './clients/DatasetClient'
import { datasetModelReducer } from './clients/DatasetModelClient'
import { dataSetAttributesReducer } from './clients/DataSetAttributesClient'
import { dataObjectAttributesReducer } from './clients/DataObjectAttributesClient'
import { mainTableReducer, tagTableReducer } from './clients/SelectionClient'
import { mainPluginServicesReducer, tagPluginServicesReducer } from './clients/PluginServiceClient'
import { mainRunPluginServiceReducer, tagRunPluginServiceReducer } from './clients/RunPluginServiceClient'
import { uiPluginDefinitionReducer } from './clients/UIPluginDefinitionClient'
import { uiPluginMetaPartitionReducer } from './clients/UIPluginMetaPartitionClient'
import { searchToponymReducer } from './clients/SearchToponymClient'
import { toponymReducer } from './clients/ToponymClient'

/**
 * Reducers for search-results module
 * @author Sébastien binda
 */
const searchResultsReducers = {
  dataObjectsAttributes: dataObjectAttributesReducer,
  dataSetsAttributes: dataSetAttributesReducer,
  datasets: datasetReducer,
  datasetsModels: datasetModelReducer,
  mainSearchCatalog: mainSearchReducer,
  tagSearchCatalog: tagSearchReducer,
  mainResultsTable: mainTableReducer,
  tagResultsTable: tagTableReducer,
  // services
  mainPluginServices: mainPluginServicesReducer,
  tagPluginServices: tagPluginServicesReducer,
  mainRunPluginService: mainRunPluginServiceReducer,
  tagRunPluginService: tagRunPluginServiceReducer,
  // plugins (for meta)
  pluginsDefinitions: uiPluginDefinitionReducer,
  pluginsMetaPartitions: uiPluginMetaPartitionReducer,
  // toponyms
  searchToponym: searchToponymReducer,
  toponyms: toponymReducer,
}

export default searchResultsReducers
