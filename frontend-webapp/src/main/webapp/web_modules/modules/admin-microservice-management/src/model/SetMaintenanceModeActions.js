/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

class SetMaintenanceModeActions extends BasicSignalActions {
  constructor(microserviceName) {
    super({
      namespace: `admin-microservice-management/set-maintenance-${microserviceName}`,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microservice}/maintenances/{projectName}/{action}`,
    })
  }
}

export default microserviceName => new SetMaintenanceModeActions(microserviceName)
