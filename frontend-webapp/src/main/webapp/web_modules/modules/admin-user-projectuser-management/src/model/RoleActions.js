import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class RoleActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-user-projectuser-management/role',
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
