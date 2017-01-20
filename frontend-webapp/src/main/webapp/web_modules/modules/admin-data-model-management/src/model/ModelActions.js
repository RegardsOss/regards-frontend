import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ModelActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-model-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-dam-list/models`,
      schemaTypes: {
        ENTITY: Schemas.MODEL,
        ENTITY_ARRAY: Schemas.MODEL_ARRAY,
      },
    })
  }
}

const instance = new ModelActions()
export default instance
