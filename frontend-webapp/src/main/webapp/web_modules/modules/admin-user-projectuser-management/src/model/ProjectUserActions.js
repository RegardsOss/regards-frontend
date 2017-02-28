/**
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

export class ProjectUserActions extends BasicPageableActions {
  constructor(namespace = 'admin-user-projectuser-management') {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/users`,
      schemaTypes: {
        ENTITY: Schemas.PROJECT_USER,
        ENTITY_ARRAY: Schemas.PROJECT_USER_ARRAY,
      },
    })
  }

}

// default instance
export default new ProjectUserActions()
