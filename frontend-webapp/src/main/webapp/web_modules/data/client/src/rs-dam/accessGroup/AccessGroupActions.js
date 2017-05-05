/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Access group entities actions
 */
export default class AccessGroupActions extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/accessgroups`,
      schemaTypes: {
        ENTITY: Schemas.ACCESS_GROUP,
        ENTITY_ARRAY: Schemas.ACCESS_GROUP_ARRAY,
      },
    })
  }
}
