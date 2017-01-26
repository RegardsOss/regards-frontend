/**
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class StoragePluginActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'archival-storage/storage-plugins',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-archival-storage/storage-plugins`, // TODO check me when back is ready!
      schemaTypes: {
        ENTITY: Schemas.STORAGE_PLUGIN,
        ENTITY_ARRAY: Schemas.STORAGE_PLUGIN_ARRAY,
      },
    })
  }
}

const instance = new StoragePluginActions()
export default instance
