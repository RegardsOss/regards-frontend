/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class AttributeModelActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-modelattribute-management/attribute-model',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-dam-list/models/attributes`,
      schemaTypes: {
        ENTITY: Schemas.ATTRIBUTE_MODEL,
        ENTITY_ARRAY: Schemas.ATTRIBUTE_MODEL_ARRAY,
      },
    })
  }
}

const instance = new AttributeModelActions()
export default instance
