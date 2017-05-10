/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class AttributeModelActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-modelattribute-management/attribute-model',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/models/attributes`,
      entityPathVariable: 'pAttributeId',
      schemaTypes: {
        ENTITY: Schemas.ATTRIBUTE_MODEL,
        ENTITY_ARRAY: Schemas.ATTRIBUTE_MODEL_ARRAY,
      },
    })
  }
}

const instance = new AttributeModelActions()
export default instance
