/**
* LICENSE_PLACEHOLDER
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
