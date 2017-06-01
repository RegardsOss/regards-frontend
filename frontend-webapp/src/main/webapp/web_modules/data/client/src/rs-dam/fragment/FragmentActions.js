/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Fragment entities from backend server.
 *
 * To use this actions, you need to pass a parameter : <namespace>.
 *
 * namespace : String, example :  'module/themes'. Must be the same as the namespace
 * used with the associated Reducer.
 *
 * The namespace is used by redux to understand what to do with the action.
 * If you want to manage two different list of projects. You have to define two
 * ProjectActions with two different namespace.
 *
 * @author Léo Mieulet
 */
export default class FragmentActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/models/fragments`,
      entityPathVariable: 'pFragmentId',
      schemaTypes: {
        ENTITY: Schemas.FRAGMENT,
        ENTITY_ARRAY: Schemas.FRAGMENT_ARRAY,
      },
    })
  }

  /**
   * Alter the entityEndpoint before sending the request, then get back to initial entityEndpoint
   * @param objectValues
   * @param files
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  createEntityUsingMultiPart(objectValues, files, pathParams, queryParams) {
    const savedEntityEndpoint = this.entityEndpoint
    this.entityEndpoint = `${this.entityEndpoint}/import`
    const resultingAction = super.createEntityUsingMultiPart(objectValues, files, pathParams, queryParams)
    this.entityEndpoint = savedEntityEndpoint
    return resultingAction
  }
}
