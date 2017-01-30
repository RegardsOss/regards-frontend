import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class RoleActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-user-role-resource-access-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/roles`,
      schemaTypes: {
        ENTITY: Schemas.ROLE,
        ENTITY_ARRAY: Schemas.ROLE_ARRAY,
      },
    })
  }
}

const instance = new RoleActions()
export default instance
