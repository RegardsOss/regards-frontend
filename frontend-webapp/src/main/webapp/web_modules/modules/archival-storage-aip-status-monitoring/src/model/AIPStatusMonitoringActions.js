/**
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class StoragePluginMonitoringActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'archival-storage-plugins-monitoring/storage-monitoring',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/archival-storage/storage-plugins`, // TODO check me when back is ready!
      schemaTypes: {
        ENTITY: Schemas.STORAGE_MONITORING_PLUGIN,
        ENTITY_ARRAY: Schemas.STORAGE_MONITORING_PLUGIN_ARRAY,
      },
    })
  }
}

const instance = new StoragePluginMonitoringActions()
export default instance
