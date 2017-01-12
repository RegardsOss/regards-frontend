import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class PluginConfigurationActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-microservice-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/plugins/%0/configuration`,
      schemaTypes: {
        ENTITY: Schemas.ADMIN_PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.ADMIN_PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }
}

const instance = new PluginConfigurationActions()
export default instance
