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

export const accessMaintenanceActions = new MaintenanceModeActions('rs-access')
export const adminMaintenanceActions = new MaintenanceModeActions('rs-admin')
export const cloudMaintenanceActions = new MaintenanceModeActions('rs-cloud')
export const damMaintenanceActions = new MaintenanceModeActions('rs-dam')
export const gatewayMaintenanceActions = new MaintenanceModeActions('rs-gateway')
