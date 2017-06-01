/**
* LICENSE_PLACEHOLDER
**/
import { CatalogClient } from '@regardsoss/client'

export const REDUCER_PATH = 'business-services-many-dataobjects'

const ENTITIES_STORE_PATH = ['modules.search-results', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-results/business-services/many-dataobjects'

export const actions = new CatalogClient.BusinessServiceActions(REDUX_ACTION_NAMESPACE,
  CatalogClient.BusinessServiceActions.ServiceScopes.MANY_DATAOBJECTS)
export const reducer = CatalogClient.getBusinessServiceReducer(REDUX_ACTION_NAMESPACE)
export const selectors = CatalogClient.getBusinessServiceSelectors(ENTITIES_STORE_PATH)

/**
 * Client to fetch business services working with many dataobjects (selection)
 */
export default {
  actions,
  reducer,
  selectors,
}
