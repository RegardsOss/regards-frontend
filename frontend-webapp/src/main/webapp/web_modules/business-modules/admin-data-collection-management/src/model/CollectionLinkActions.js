/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

class CollectionLinkActions extends BasicSignalActions {
  constructor() {
    super({
      namespace: 'admin-data-collection-management/collection-link',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/collections/{collection_id}/{operation}`,
    })
  }
}

const instance = new CollectionLinkActions()
export default instance
