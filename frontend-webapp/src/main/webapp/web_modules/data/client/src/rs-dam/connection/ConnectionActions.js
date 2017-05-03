import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

export default class ConnectionActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/connections`,
      entityPathVariable: 'pConnectionId',
      schemaTypes: {
        ENTITY: Schemas.CONNECTION,
        ENTITY_ARRAY: Schemas.CONNECTION_ARRAY,
      },
    })
  }
}
