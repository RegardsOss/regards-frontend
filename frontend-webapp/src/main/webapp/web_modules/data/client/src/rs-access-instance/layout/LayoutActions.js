/*
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle layout entities from backend server.
 *
 * To use this actions, you need to pass a parameter : <namespace>.
 *
 * namespace : String, example :  'module/layouts'. Must be the same as the namespace
 * used with the associated Reducer.
 *
 * The namespace is used by redux to understand what to do with the action.
 * If you want to manage two different list of projects. You have to define two
 * ProjectActions with two different namespace.
 *
 * @author Sébastien Binda
 */
class LayoutActions extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-access-instance/layouts`,
      entityPathVariable: 'applicationId',
      schemaTypes: {
        ENTITY: Schemas.LAYOUT,
        ENTITY_ARRAY: Schemas.LAYOUT_ARRAY,
      },
    })
  }
}

export default namespace => new LayoutActions(namespace)
