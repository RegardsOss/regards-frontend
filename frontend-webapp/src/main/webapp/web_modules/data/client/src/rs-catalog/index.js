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

import LinkPluginDatasetActions from './linkPluginDataset/LinkPluginDatasetActions'
import getLinkPluginDatasetReducer from './linkPluginDataset/LinkPluginDatasetReducer'
import getLinkPluginDatasetSelectors from './linkPluginDataset/LinkPluginDatasetSelectors'

import SearchDataobjectsActions from './search/SearchDataobjectsActions'
import SearchDatasetsFromDataObjectsActions from './search/SearchDatasetsFromDataObjectsActions'
import SearchDatasetsActions from './search/SearchDatasetsActions'
import SearchEntitiesActions from './search/SearchEntitiesActions'
import getSearchEntitiesReducer from './search/SearchEntitiesReducer'
import getSearchEntitiesSelectors from './search/SearchEntitiesSelectors'
import SearchEntityActions from './search/SearchEntityActions'

import BusinessServiceActions from './services/BusinessServiceActions'
import getBusinessServiceReducer from './services/BusinessServiceReducer'
import getBusinessServiceSelectors from './services/BusinessServiceSelectors'

export default {
  LinkPluginDatasetActions,
  getLinkPluginDatasetReducer,
  getLinkPluginDatasetSelectors,

  SearchDataobjectsActions,
  SearchDatasetsActions,
  SearchDatasetsFromDataObjectsActions,
  SearchEntitiesActions,
  getSearchEntitiesReducer,
  getSearchEntitiesSelectors,

  SearchEntityActions,

  BusinessServiceActions,
  getBusinessServiceReducer,
  getBusinessServiceSelectors,
}
