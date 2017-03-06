/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class PluginMetaDataActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-accessright-management/pluginMetaData',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microserviceName}/plugins`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN_META_DATA,
        ENTITY_ARRAY: Schemas.PLUGIN_META_DATA_ARRAY,
      },
    })
  }
}

const instance = new PluginMetaDataActions()
export default instance
