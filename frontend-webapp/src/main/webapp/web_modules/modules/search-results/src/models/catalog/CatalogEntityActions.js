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
  constructor(options) {
    super({
      namespace: 'search/results',
      entityEndpoint: options && options.entityEndpoint ? options.entityEndpoint : `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/search?{queryParams}`,
      schemaTypes: {
        ENTITY: Schemas.ENTITY,
        ENTITY_ARRAY: Schemas.ENTITY_ARRAY,
      },
    })
  }
}

export {
  CatalogEntityActions,
}
const instance = new CatalogEntityActions()
export default instance
