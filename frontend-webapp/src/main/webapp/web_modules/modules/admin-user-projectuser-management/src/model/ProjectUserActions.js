import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'
const { CALL_API, getJSON } = require('redux-api-middleware')
import { normalize } from 'normalizr'

class ProjectUserActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-user-projectuser-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/users`,
      schemaTypes: {
        ENTITY: Schemas.PROJECT_USER,
        ENTITY_ARRAY: Schemas.PROJECT_USER_ARRAY,
      },
    })
  }
}

const instance = new ProjectUserActions()
export default instance
