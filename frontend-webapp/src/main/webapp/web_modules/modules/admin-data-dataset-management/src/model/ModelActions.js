import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ModelActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-dataset-management/model',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam-list/models?type={type}`,
      entityPathVariable: 'pModelId',
      schemaTypes: {
        ENTITY: Schemas.MODEL,
        ENTITY_ARRAY: Schemas.MODEL_ARRAY,
      },
    })
  }
}

const instance = new ModelActions()
export default instance
