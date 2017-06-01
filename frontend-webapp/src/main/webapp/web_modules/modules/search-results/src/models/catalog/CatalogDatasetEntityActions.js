/**
 * LICENSE_PLACEHOLDER
 **/
import { CatalogEntityActions } from './CatalogEntityActions'

/**
 * Redux store Actions for Module entities.
 * @author Sébastien binda
 */
class CatalogDatasetEntityActions extends CatalogEntityActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/dataobjects/datasets/search?{queryParams}`,
    })
  }
}

const instance = new CatalogDatasetEntityActions()
export default instance
