import Schemas from '@regardsoss/api'
import { BasicSignalActions } from '@regardsoss/store-utils'

class UserGroupActions extends BasicSignalActions {
  constructor() {
    super({
      namespace: 'admin-user-projectuser-management/usergroup',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/accessgroups/{name}/{email}`,
      schemaTypes: {
        ENTITY: Schemas.ACCESS_GROUP,
        ENTITY_ARRAY: Schemas.ACCESS_GROUP_ARRAY,
      },
    })
  }
}

const instance = new UserGroupActions()
export default instance
