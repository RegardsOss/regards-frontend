import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Fetches collection models
 */
class CollectionModelActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'search-graph/collection-model',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/models?type=COLLECTION`, // TODO right URL here
      schemaTypes: {
        ENTITY: Schemas.MODEL,
        ENTITY_ARRAY: Schemas.MODEL_ARRAY,
      },
    })
  }
}

export default new CollectionModelActions()
