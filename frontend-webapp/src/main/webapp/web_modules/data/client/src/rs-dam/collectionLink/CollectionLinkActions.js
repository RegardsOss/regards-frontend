/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Collection link (tags) entities from backend server.
 *
 * @author Léo Mieulet
 */
export default class CollectionLinkActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/collections/{collection_id}/{operation}`,
    })
  }
}
