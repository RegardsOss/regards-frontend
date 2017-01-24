import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class PluginConfigurationActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-microservice-management/pluginConfiguration',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/%0/plugins/%1/config`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }
}

const instance = new PluginConfigurationActions()
export default instance
