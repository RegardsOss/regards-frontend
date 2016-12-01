import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ProjectUserActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-project-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/users`,
      schemaTypes: {
        ENTITY: Schemas.USER,
        ENTITY_ARRAY: Schemas.USER_ARRAY,
      },
    })
  }
}

const instance = new ProjectUserActions()
export default instance
