/**
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class AccessesActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-user-projectuser-management/accesses',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/accesses`,
      schemaTypes: {
        ENTITY: Schemas.ACCESSES,
        ENTITY_ARRAY: Schemas.ACCESSES_ARRAY,
      },
    })
  }
}

const instance = new AccessesActions()
export default instance
