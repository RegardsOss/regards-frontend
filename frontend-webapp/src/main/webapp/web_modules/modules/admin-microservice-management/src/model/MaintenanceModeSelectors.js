import { BasicSignalSelectors } from '@regardsoss/store-utils'

class MaintenanceModeSelectors extends BasicSignalSelectors {
  constructor(microserviceName) {
    super(['admin', 'microservice-management', `maintenance-${microserviceName}`])
  }
}

export const accessMaintenanceSelectors = new MaintenanceModeSelectors('rs-access')
export const adminMaintenanceSelectors = new MaintenanceModeSelectors('rs-admin')
export const cloudMaintenanceSelectors = new MaintenanceModeSelectors('rs-cloud')
export const damMaintenanceSelectors = new MaintenanceModeSelectors('rs-dam')
export const gatewayMaintenanceSelectors = new MaintenanceModeSelectors('rs-gateway')
