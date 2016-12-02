import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ProjectActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-project-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/projects`,
      schemaTypes: {
        ENTITY: Schemas.PROJECT,
        ENTITY_ARRAY: Schemas.PROJECT_ARRAY,
      },
    })
  }
}

const instance = new ProjectActions()
export default instance
