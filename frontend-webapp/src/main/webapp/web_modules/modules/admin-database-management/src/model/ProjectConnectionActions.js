/*
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ProjectConnectionActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-database-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/projects/connections`,
      schemaTypes: {
        ENTITY: Schemas.PROJECT_CONNECTION,
        ENTITY_ARRAY: Schemas.PROJECT_CONNECTION_ARRAY,
      },
    })
  }
}

const instance = new ProjectConnectionActions()
export default instance
