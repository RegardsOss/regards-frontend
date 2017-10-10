/**
* LICENSE_PLACEHOLDER
**/
import { AccessProjectClient } from '@regardsoss/client'

export const REDUCER_PATH = 'searchCatalog'

const ENTITIES_STORE_PATH = ['modules.search-results', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-results/search-catalog'


export const searchDataobjectsActions = new AccessProjectClient.SearchDataobjectsActions(REDUX_ACTION_NAMESPACE)
export const searchDatasetsFromDataObjectsActions = new AccessProjectClient.SearchDatasetsFromDataObjectsActions(REDUX_ACTION_NAMESPACE)
export const searchDatasetsActions = new AccessProjectClient.SearchDatasetsActions(REDUX_ACTION_NAMESPACE)
export const searchEntitiesActions = new AccessProjectClient.SearchEntitiesActions(REDUX_ACTION_NAMESPACE)
export const reducer = AccessProjectClient.getSearchEntitiesReducer(REDUX_ACTION_NAMESPACE)
export const selectors = AccessProjectClient.getSearchEntitiesSelectors(ENTITIES_STORE_PATH)

/**
 * Client to search in catalog.
 * Note: this clients exports multiple actions for the same reducer
 */
export default {
  searchDataobjectsActions,
  searchDatasetsFromDataObjectsActions,
  searchDatasetsActions,
  searchEntitiesActions,
  reducer,
  selectors,
}
