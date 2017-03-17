import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class AccessGroupActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-user-accessgroup-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/accessgroups`,
      entityPathVariable: 'name',
      schemaTypes: {
        ENTITY: Schemas.ACCESS_GROUP,
        ENTITY_ARRAY: Schemas.ACCESS_GROUP_ARRAY,
      },
    })
  }
}

const instance = new AccessGroupActions()
export default instance
