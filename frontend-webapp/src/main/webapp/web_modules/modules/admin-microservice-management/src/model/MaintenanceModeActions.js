/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

class MaintenanceModeActions extends BasicSignalActions {
  constructor(microserviceName) {
    super({
      namespace: `admin-microservice-management/maintenance-${microserviceName}`,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${microserviceName}/maintenances`,
    })
  }
}

export default microserviceName => new MaintenanceModeActions(microserviceName)
