import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'
const { CALL_API, getJSON } = require('redux-api-middleware')
import { normalize } from 'normalizr'

class AccessesActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-user-projectuser-management/accesses',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/accesses`,
      schemaTypes: {
        ENTITY: Schemas.ACCESSES,
        ENTITY_ARRAY: Schemas.ACCESSES_ARRAY,
      },
    })
  }
}

const instance = new AccessesActions()
export default instance
