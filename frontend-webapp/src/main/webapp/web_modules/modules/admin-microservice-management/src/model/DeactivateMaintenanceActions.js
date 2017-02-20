/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

class DeactivateMaintenanceActions extends BasicSignalActions {
  constructor(microserviceName, projectName) {
    super({
      namespace: `admin-microservice-management/maintenance-${microserviceName}-deactivate`,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${microserviceName}/maintenances/${projectName}/desactivate`,
    })
  }
}

export const accessDeactivateMaintenanceActions = projectName => new DeactivateMaintenanceActions('rs-access', projectName)
export const adminDeactivateMaintenanceActions = projectName => new DeactivateMaintenanceActions('rs-admin', projectName)
export const cloudDeactivateMaintenanceActions = projectName => new DeactivateMaintenanceActions('rs-cloud', projectName)
export const damDeactivateMaintenanceActions = projectName => new DeactivateMaintenanceActions('rs-dam', projectName)
export const gatewayDeactivateMaintenanceActions = projectName => new DeactivateMaintenanceActions('rs-gateway', projectName)
