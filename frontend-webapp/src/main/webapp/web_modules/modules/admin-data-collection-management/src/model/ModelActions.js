import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ModelActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-collection-management/model',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/models`,
      schemaTypes: {
        ENTITY: Schemas.MODEL,
        ENTITY_ARRAY: Schemas.MODEL_ARRAY,
      },
    })
  }
}

const instance = new ModelActions()
export default instance
