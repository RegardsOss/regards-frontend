/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { combineReducers } from 'redux'
import { modelReducer } from './clients/ModelClient'
import { connectionReducer } from './clients/ConnectionClient'
import { datasourceReducer } from './clients/DatasourceClient'
import { connectionTableReducer } from './clients/ConnectionTableClient'
import { connectionTableAttributesReducer } from './clients/ConnectionTableAttributesClient'
import { modelAttributesReducer } from './clients/ModelAttributesClient'
import { descriptorReducer } from './clients/OpensearchDescriptorClient'
import { pluginMetaDataReducer } from './clients/PluginMetaDataClient'
import { crawlerDatasourceReducer } from './clients/CrawlerDatasourceClient'

const datasourceDataManagementReducer = combineReducers({
  datasource: datasourceReducer,
  crawler: crawlerDatasourceReducer,
  connection: connectionReducer,
  model: modelReducer,
  'model-attributes': modelAttributesReducer,
  'opensearch-descriptor': descriptorReducer,
  'connection-table': connectionTableReducer,
  'connection-table-attributes': connectionTableAttributesReducer,
  'plugin-meta-data': pluginMetaDataReducer,
})

export default datasourceDataManagementReducer
