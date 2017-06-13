/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'


export default class ConnectionTestActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/connections/{connectionId}`,
      bypassErrorMiddleware: true,
    })
  }
}
