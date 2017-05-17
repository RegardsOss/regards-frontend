/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

export default class MicroserviceInfosActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microserviceName}/info`,
      namespace,
      bypassErrorMiddleware: true,
    })
  }

  check(microserviceName) {
    return this.sendSignal('GET', {}, { microserviceName })
  }
}
