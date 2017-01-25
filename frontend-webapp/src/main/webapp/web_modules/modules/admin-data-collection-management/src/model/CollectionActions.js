import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class CollectionActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-data-collection-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-dam/collections`,
      schemaTypes: {
        ENTITY: Schemas.COLLECTION,
        ENTITY_ARRAY: Schemas.COLLECTION_ARRAY,
      },
    })
  }
}

const instance = new CollectionActions()
export default instance
