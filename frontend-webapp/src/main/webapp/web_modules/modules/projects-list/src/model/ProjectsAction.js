/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 */
class ProjectsAction extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'projects-list/projects',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/projects`,
      schemaTypes: {
        ENTITY: Schemas.PROJECT,
        ENTITY_ARRAY: Schemas.PROJECT_ARRAY,
      },
    })
  }
}

const instance = new ProjectsAction()
export default instance
