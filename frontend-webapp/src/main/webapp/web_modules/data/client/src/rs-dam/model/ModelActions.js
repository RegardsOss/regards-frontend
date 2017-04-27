import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Model entities from backend server.
 *
 * @author Léo Mieulet
 */
export default class ModelActions extends BasicListActions {

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/models`,
      entityPathVariable: 'pModelId',
      schemaTypes: {
        ENTITY: Schemas.MODEL,
        ENTITY_ARRAY: Schemas.MODEL_ARRAY,
      },
    })
  }

  /**
   * Alter the entityEndpoint before sending the request, then get back to initial entityEndpoint
   * @param modelId Model id you want to duplicate
   * @param values Model new name and new description
   * @param queryParams
   * @returns {{}|*}
   */
  duplicateModel(modelId, values, queryParams) {
    const savedEntityEndpoint = this.entityEndpoint
    this.entityEndpoint = `${this.entityEndpoint}/{pModelId}/duplicate`
    const resultingAction = super.createEntity(values, {
      pModelId: modelId,
    }, queryParams)
    this.entityEndpoint = savedEntityEndpoint
    return resultingAction
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
