/**
* LICENSE_PLACEHOLDER
**/
import { CatalogClient } from '@regardsoss/client'

export const REDUCER_PATH = 'searchCatalog'

const ENTITIES_STORE_PATH = ['modules.search-results', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-results/search-catalog'


export const searchDataobjectsActions = new CatalogClient.SearchDataobjectsActions(REDUX_ACTION_NAMESPACE)
export const searchDatasetsActions = new CatalogClient.SearchDatasetsActions(REDUX_ACTION_NAMESPACE)
export const searchEntitiesActions = new CatalogClient.SearchEntitiesActions(REDUX_ACTION_NAMESPACE)
export const reducer = CatalogClient.getSearchEntitiesReducer(REDUX_ACTION_NAMESPACE)
export const selectors = CatalogClient.getSearchEntitiesSelectors(ENTITIES_STORE_PATH)

/**
 * Client to search in catalog.
 * Note: this clients exports multiple actions for the same reducer
 */
export default {
  searchDataobjectsActions,
  searchDatasetsActions,
  searchEntitiesActions,
  reducer,
  selectors,
}
