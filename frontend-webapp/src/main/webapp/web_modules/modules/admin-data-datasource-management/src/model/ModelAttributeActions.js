/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ModelAttributeActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-datasource-management/model-attribute',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam-list/models/{id}/attributes`,
      schemaTypes: {
        ENTITY: Schemas.MODEL_ATTRIBUTE,
        ENTITY_ARRAY: Schemas.MODEL_ATTRIBUTE_ARRAY,
      },
    })
  }
}

const instance = new ModelAttributeActions()
export default instance
