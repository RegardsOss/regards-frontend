import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class ResourceAccessActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-user-role-resource-access-management/resource-access',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/resources/{microserviceName}/{controllerName}`,
      schemaTypes: {
        ENTITY: Schemas.RESOURCE_ACCESS,
        ENTITY_ARRAY: Schemas.RESOURCE_ACCESS_ARRAY,
      },
    })
  }
}

const instance = new ResourceAccessActions()
export default instance
