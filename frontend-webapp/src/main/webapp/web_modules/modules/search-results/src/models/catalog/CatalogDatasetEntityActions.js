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
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-catalog/dataobjects/datasets/search`,
    })
  }
}

const instance = new CatalogDatasetEntityActions()
export default instance
