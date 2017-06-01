/*
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle ProjectConnection entities from backend server.
 *
 * To use this actions, you need to pass a parameter : <namespace>.
 *
 * namespace : String, example :  'module/ProjectConnection'.
 * Must be the same as the namespace used with the associated Reducer.
 *
 * The namespace is used by redux to understand what to do with the action.
 * If you want to manage two different list of ProjectConnection. You have to define two
 * ProjectConnectionActions with two different namespace.
 *
 * @author Sébastien Binda
 */
class ProjectConnectionActions extends BasicPageableActions {

  /**
   * Constructor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/projects/{projectName}/connections`,
      entityPathVariable: 'connectionId',
      schemaTypes: {
        ENTITY: Schemas.PROJECT_CONNECTION,
        ENTITY_ARRAY: Schemas.PROJECT_CONNECTION_ARRAY,
      },
    })
  }
}

export default namespace => new ProjectConnectionActions(namespace)
