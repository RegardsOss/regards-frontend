/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * We only use POST and DELETE on this BasicList
 */
class ModelAttributeFragmentActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-modelattribute-management/model-attribute-fragment',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/models/{id}/attributes/fragments`,
      schemaTypes: {
        ENTITY: Schemas.MODEL_ATTRIBUTE,
        ENTITY_ARRAY: Schemas.MODEL_ATTRIBUTE_ARRAY,
      },
    })
  }
}

const instance = new ModelAttributeFragmentActions()
export default instance
