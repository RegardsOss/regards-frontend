/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
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
    console.log('Check for microservice', microserviceName)
    return this.sendSignal('GET', {}, { microserviceName })
  }
}
