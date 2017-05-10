/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalSelectors } from '@regardsoss/store-utils'

class MaintenanceModeSelectors extends BasicSignalSelectors {
  constructor(microserviceName) {
    super(['admin', 'microservice-management', `maintenance-${microserviceName}`])
  }
}

export default microservice => new MaintenanceModeSelectors(microservice)
