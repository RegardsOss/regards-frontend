/**
 * LICENSE_PLACEHOLDER
 **/
import SearchEntitiesActions from './SearchEntitiesActions'

/**
 * Actions to search for catalog dataobjects, reduced by the same handler than catalog dataset entity actions
 */
export default class CatalogDataobjectEntityActions extends SearchEntitiesActions {
  constructor(namespace) {
    super(namespace, `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/dataobjects/search?{queryParams}`)
  }
}
