/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

export default class PluginConfigurationActions extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microserviceName}/plugins/configs`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }
}
