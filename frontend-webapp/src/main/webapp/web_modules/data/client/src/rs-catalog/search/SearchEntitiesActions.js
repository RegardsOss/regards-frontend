/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicFacetsPageableActions } from '@regardsoss/store-utils'
import Schemas from '@regardsoss/api'

/**
 * Direct research entities actions
 */
export default class CatalogSearchEntitiesActions extends BasicFacetsPageableActions {
  /**
   * Constructor
   * @param {*} namespace namespace for actions
   * @param {*} endpoint endpoint (optional, default to generic search catalog endpoint)
   */
  constructor(namespace, endpoint = `${GATEWAY_HOSTNAME}/${API_URL}/rs-catalog/search?{queryParams}`) {
    super({
      namespace,
      entityEndpoint: endpoint,
      schemaTypes: {
        ENTITY: Schemas.ENTITY,
        ENTITY_ARRAY: Schemas.ENTITY_ARRAY,
      },
    })
  }
}
