/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicFacetsPageableActions } from '@regardsoss/store-utils'
import { CatalogEntityActions } from './CatalogEntityActions'

/**
 * Redux store Actions for Module entities.
 * @author Sébastien binda
 */
class CatalogDatasetEntityActions extends CatalogEntityActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-catalog/dataobjects/datasets/search?{queryParams}`,
    })
  }
}

const instance = new CatalogDatasetEntityActions()
export default instance
