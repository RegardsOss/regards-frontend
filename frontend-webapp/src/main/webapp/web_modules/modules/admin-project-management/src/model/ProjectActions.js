import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class ProjectActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-project-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/projects`,
      schemaTypes: {
        ENTITY: Schemas.PROJECT,
        ENTITY_ARRAY: Schemas.PROJECT_ARRAY,
      },
    })
  }
}

const instance = new ProjectActions()
export default instance
