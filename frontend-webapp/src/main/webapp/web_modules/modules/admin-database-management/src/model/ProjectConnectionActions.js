/*
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class ProjectConnectionActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-database-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/project_connections`,
      entityPathVariable: 'project_connection_id',
      schemaTypes: {
        ENTITY: Schemas.PROJECT_CONNECTION,
        ENTITY_ARRAY: Schemas.PROJECT_CONNECTION_ARRAY,
      },
    })
  }
}

const instance = new ProjectConnectionActions()
export default instance
