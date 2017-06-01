import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class CollectionActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-data-collection-management/collection',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/collections`,
      entityPathVariable: 'collection_id',
      schemaTypes: {
        ENTITY: Schemas.COLLECTION,
        ENTITY_ARRAY: Schemas.COLLECTION_ARRAY,
      },
    })
  }
}

const instance = new CollectionActions()
export default instance
