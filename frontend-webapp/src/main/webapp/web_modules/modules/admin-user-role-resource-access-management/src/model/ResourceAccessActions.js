import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ResourceAccessActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-user-role-resource-access-management/resource-access',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/resources`,
      schemaTypes: {
        ENTITY: Schemas.RESOURCE_ACCESS,
        ENTITY_ARRAY: Schemas.RESOURCE_ACCESS_ARRAY,
      },
    })
  }
}

const instance = new ResourceAccessActions()
export default instance
