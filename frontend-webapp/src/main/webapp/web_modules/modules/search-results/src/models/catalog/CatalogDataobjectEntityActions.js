/**
 * LICENSE_PLACEHOLDER
 **/
import { CatalogEntityActions } from './CatalogEntityActions'

/**
 * Redux store Actions for Module entities.
 * @author Sébastien binda
 */
class CatalogDataobjectEntityActions extends CatalogEntityActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-catalog/dataobjects/search?{queryParams}`,
    })
  }
}

const instance = new CatalogDataobjectEntityActions()
export default instance
