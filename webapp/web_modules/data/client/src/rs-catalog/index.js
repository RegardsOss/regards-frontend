/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import EnumeratedDOPropertyValuesActions from './search/EnumeratedDOPropertyValuesActions'
import getEnumeratedDOPropertyValuesReducer from './search/EnumeratedDOPropertyValuesReducer'
import getEnumeratedDOPropertyValuesSelectors from './search/EnumeratedDOPropertyValuesSelectors'


import LinkPluginDatasetActions from './linkPluginDataset/LinkPluginDatasetActions'
import getLinkPluginDatasetReducer from './linkPluginDataset/LinkPluginDatasetReducer'
import getLinkPluginDatasetSelectors from './linkPluginDataset/LinkPluginDatasetSelectors'

import SearchCollectionsActions from './search/SearchCollectionsActions'
import SearchDataobjectsActions from './search/SearchDataobjectsActions'
import SearchDatasetsFromDataObjectsActions from './search/SearchDatasetsFromDataObjectsActions'
import SearchDocumentsActions from './search/SearchDocumentsActions'
import SearchDatasetsActions from './search/SearchDatasetsActions'
import SearchEntitiesActions from './search/SearchEntitiesActions'
import getSearchEntitiesReducer from './search/SearchEntitiesReducer'
import getSearchEntitiesSelectors from './search/SearchEntitiesSelectors'
import SearchEntityActions from './search/SearchEntityActions'

import CatalogPluginServiceResultActions from './services/CatalogPluginServiceResultActions'

module.exports = {
  EnumeratedDOPropertyValuesActions,
  getEnumeratedDOPropertyValuesReducer,
  getEnumeratedDOPropertyValuesSelectors,

  LinkPluginDatasetActions,
  getLinkPluginDatasetReducer,
  getLinkPluginDatasetSelectors,

  SearchCollectionsActions,
  SearchDataobjectsActions,
  SearchDatasetsActions,
  SearchDatasetsFromDataObjectsActions,
  SearchDocumentsActions,
  SearchEntitiesActions,
  getSearchEntitiesReducer,
  getSearchEntitiesSelectors,

  SearchEntityActions,
  CatalogPluginServiceResultActions,
}
