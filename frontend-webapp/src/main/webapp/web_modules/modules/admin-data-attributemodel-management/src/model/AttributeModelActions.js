import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class AttributeModelActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-attributemodel-management',
      entityEndpoint: 'http://172.26.47.52:9080/models/attributes',
      schemaTypes: {
        ENTITY: Schemas.ATTRIBUTE_MODEL,
        ENTITY_ARRAY: Schemas.ATTRIBUTE_MODEL_ARRAY,
      },
    })
  }
}

const instance = new AttributeModelActions()
export default instance
