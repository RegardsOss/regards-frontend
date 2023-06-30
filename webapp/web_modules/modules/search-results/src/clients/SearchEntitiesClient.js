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
import { UIDomain } from '@regardsoss/domain'
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Catalog entitites clients, by tab
 * @author Raphaël Mechali
 */

/**
 * Client to search in catalog for main results tab
 */
const MAIN_ENTITIES_STORE_PATH = ['modules.search-results', 'mainSearchCatalog']
const MAIN_REDUX_ACTION_NAMESPACE = 'search-results/main-results/search-catalog'
export const mainSearchDataobjectsActions = new AccessProjectClient.SearchDataobjectsActions(MAIN_REDUX_ACTION_NAMESPACE)
export const mainSearchDatasetsActions = new AccessProjectClient.SearchDatasetsFromDataObjectsActions(MAIN_REDUX_ACTION_NAMESPACE)
export const mainSearchReducer = AccessProjectClient.getSearchEntitiesReducer(MAIN_REDUX_ACTION_NAMESPACE)
export const mainSearchSelectors = AccessProjectClient.getSearchEntitiesSelectors(MAIN_ENTITIES_STORE_PATH)
const mainResultsCatalogClient = {
  searchDataobjectsActions: mainSearchDataobjectsActions,
  searchDatasetsActions: mainSearchDatasetsActions,
  searchReducer: mainSearchReducer,
  searchSelectors: mainSearchSelectors,
}

/**
 * Client to search in catalog for tag results tab
 */
const TAG_ENTITIES_STORE_PATH = ['modules.search-results', 'tagSearchCatalog']
const TAG_REDUX_ACTION_NAMESPACE = 'search-results/tag-results/search-catalog'
export const tagSearchDataobjectsActions = new AccessProjectClient.SearchDataobjectsActions(TAG_REDUX_ACTION_NAMESPACE)
export const tagSearchDatasetsActions = new AccessProjectClient.SearchDatasetsFromDataObjectsActions(TAG_REDUX_ACTION_NAMESPACE)
export const tagSearchReducer = AccessProjectClient.getSearchEntitiesReducer(TAG_REDUX_ACTION_NAMESPACE)
export const tagSearchSelectors = AccessProjectClient.getSearchEntitiesSelectors(TAG_ENTITIES_STORE_PATH)
const tagResultsCatalogClient = {
  searchDataobjectsActions: tagSearchDataobjectsActions,
  searchDatasetsActions: tagSearchDatasetsActions,
  searchReducer: tagSearchReducer,
  searchSelectors: tagSearchSelectors,
}

/**
 * Returns client to use for tab type
 * @param {*} tabType tab type
 * @return {{
 * searchDataobjectsActions: *,
 * searchDatasetsActions: *,
 * searchReducer: Function,
 * searchSelectors: *,
 * }} results client to use for current tab
 */
export function getSearchCatalogClient(tabType) {
  switch (tabType) {
    case UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS:
      return mainResultsCatalogClient
    case UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS:
      return tagResultsCatalogClient
    default:
      throw new Error(`Cannot get table client for tab ${tabType}`)
  }
}
