/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

class ActivateMaintenanceActions extends BasicSignalActions {
  constructor(microserviceName, projectName) {
    super({
      namespace: `admin-microservice-management/maintenance-${microserviceName}-activate`,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${microserviceName}/maintenances/${projectName}/activate`,
    })
  }
}

export const accessActivateMaintenanceActions = projectName => new ActivateMaintenanceActions('rs-access', projectName)
export const adminActivateMaintenanceActions = projectName => new ActivateMaintenanceActions('rs-admin', projectName)
export const cloudActivateMaintenanceActions = projectName => new ActivateMaintenanceActions('rs-cloud', projectName)
export const damActivateMaintenanceActions = projectName => new ActivateMaintenanceActions('rs-dam', projectName)
export const gatewayActivateMaintenanceActions = projectName => new ActivateMaintenanceActions('rs-gateway', projectName)
