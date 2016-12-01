import { PROJECT, PROJECT_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ProjectActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-project-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/projects`,
      schemaTypes: {
        ENTITY: PROJECT,
        ENTITY_ARRAY: PROJECT_ARRAY,
      },
    })
  }
}

const instance = new ProjectActions()
export default instance
