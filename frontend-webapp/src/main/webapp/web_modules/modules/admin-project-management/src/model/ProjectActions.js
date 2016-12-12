import Schemas from '@regardsoss/api'
import { BasicPaegableActions } from '@regardsoss/store-utils'

class ProjectActions extends BasicPaegableActions {
  constructor() {
    super({
      namespace: 'admin-project-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/projects`,
      schemaTypes: {
        ENTITY: Schemas.PROJECT,
        ENTITY_ARRAY: Schemas.PROJECT_ARRAY,
      },
    })
  }
}

const instance = new ProjectActions()
export default instance
