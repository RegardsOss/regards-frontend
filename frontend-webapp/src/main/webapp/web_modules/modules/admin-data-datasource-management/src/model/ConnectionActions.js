/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ConnectionActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-connection-management/connection',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/connections`,
      entityPathVariable: 'connection_id',
      schemaTypes: {
        ENTITY: Schemas.CONNECTION,
        ENTITY_ARRAY: Schemas.CONNECTION_ARRAY,
      },
    })
  }
}

const instance = new ConnectionActions()
export default instance
