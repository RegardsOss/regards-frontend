/**
 * LICENSE_PLACEHOLDER
 **/
import SearchEntitiesActions from './SearchEntitiesActions'

/**
 * Actions to search for catalog datasets
 */
export default class CatalogDatasetEntityActions extends SearchEntitiesActions {
  constructor(namespace) {
    super(namespace, `${GATEWAY_HOSTNAME}/${API_URL}/rs-catalog/dataobjects/datasets/search?{queryParams}`)
  }
}

