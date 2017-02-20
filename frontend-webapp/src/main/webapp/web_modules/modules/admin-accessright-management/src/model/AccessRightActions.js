/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class AccessRightActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-accessright-management/access-right',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/accessrights`,
      schemaTypes: {
        ENTITY: Schemas.ACCESS_RIGHT,
        ENTITY_ARRAY: Schemas.ACCESS_RIGHT_ARRAY,
      },
    })
  }
}

const instance = new AccessRightActions()
export default instance
