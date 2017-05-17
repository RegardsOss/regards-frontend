/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class PluginConfigurationActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-accessright-management/pluginConfiguration',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microserviceName}/plugins/configs`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }
}

const instance = new PluginConfigurationActions()
export default instance
