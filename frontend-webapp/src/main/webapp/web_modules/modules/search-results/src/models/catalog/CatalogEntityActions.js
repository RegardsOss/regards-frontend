/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicFacetsPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 * @author Sébastien binda
 */
class CatalogEntityActions extends BasicFacetsPageableActions {
  constructor() {
    super({
      namespace: 'search/results',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-catalog/search?{queryParams}`,
      schemaTypes: {
        ENTITY: Schemas.ENTITY,
        ENTITY_ARRAY: Schemas.ENTITY_ARRAY,
      },
    })
  }
}

const instance = new CatalogEntityActions()
export default instance
