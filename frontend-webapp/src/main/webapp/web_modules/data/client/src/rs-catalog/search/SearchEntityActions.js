/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Actions to find an entity by its IP ID (unlike search entities, it will always provide a single entity as result)
 */
export default class SearchEntityActions extends BasicSignalActions {

  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/search/entities/{ipId}`,
      bypassErrorMiddleware: false,
    })
  }

  getEntity(ipId) {
    return this.sendSignal('GET', null, { ipId })
  }

}
