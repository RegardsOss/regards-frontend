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
import { AccessProjectClient } from '@regardsoss/client'

const ENTITIES_STORE_PATH = ['modules.search-results', 'searchCatalog']
const REDUX_ACTION_NAMESPACE = 'search-results/search-catalog'


const searchDataobjectsActions = new AccessProjectClient.SearchDataobjectsActions(REDUX_ACTION_NAMESPACE)
const searchDatasetsFromDataObjectsActions = new AccessProjectClient.SearchDatasetsFromDataObjectsActions(REDUX_ACTION_NAMESPACE)
const searchDatasetsActions = new AccessProjectClient.SearchDatasetsActions(REDUX_ACTION_NAMESPACE)
const searchDocumentsActions = new AccessProjectClient.SearchDocumentsActions(REDUX_ACTION_NAMESPACE)
const searchEntitiesActions = new AccessProjectClient.SearchEntitiesActions(REDUX_ACTION_NAMESPACE)
const reducer = AccessProjectClient.getSearchEntitiesReducer(REDUX_ACTION_NAMESPACE)
const selectors = AccessProjectClient.getSearchEntitiesSelectors(ENTITIES_STORE_PATH)

/**
 * Client to search in catalog.
 * Note: this clients exports multiple actions for the same reducer
 */
module.exports = {
  searchDataobjectsActions,
  searchDatasetsFromDataObjectsActions,
  searchDatasetsActions,
  searchDocumentsActions,
  searchEntitiesActions,
  reducer,
  selectors,
}
