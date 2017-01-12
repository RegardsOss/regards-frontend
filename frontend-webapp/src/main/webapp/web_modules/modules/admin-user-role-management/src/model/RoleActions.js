/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class RoleActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-user-role-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/roles`,
      schemaTypes: {
        ENTITY: Schemas.ROLE,
        ENTITY_ARRAY: Schemas.ROLE_ARRAY,
      },
    })
  }
}

const instance = new RoleActions()
export default instance
