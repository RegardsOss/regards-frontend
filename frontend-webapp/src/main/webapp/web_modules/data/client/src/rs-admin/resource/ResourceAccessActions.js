import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle ControllerActions entities from backend server.
 *
 * To use this actions, you need to pass a parameter : <namespace>.
 *
 * namespace : String, exemple :  'module/ProjectConnection'.
 * Must be the same as the namespace used with the associated Reducer.
 *
 * The namespace is used by redux to understand what to do with the action.
 * If you want to manage two different list of ProjectConnection. You have to define two
 * ProjectConnectionActions with two different namespace.
 *
 * @author Sébastien Binda
 */
class ResourceAccessActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/resources/microservices/{microservicename}/controllers/{controllername}`,
      schemaTypes: {
        ENTITY: Schemas.RESOURCE_ACCESS,
        ENTITY_ARRAY: Schemas.RESOURCE_ACCESS_ARRAY,
      },
    })
  }
}

export default namespace => new ResourceAccessActions(namespace)
