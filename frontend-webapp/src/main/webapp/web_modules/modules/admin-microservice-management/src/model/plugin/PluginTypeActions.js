/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicArrayActions } from '@regardsoss/store-utils'

/**
 * API actions for plugin types
 */
class PluginTypeActions extends BasicArrayActions {
  constructor() {
    super({
      namespace: 'admin-microservice-management/pluginType',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microserviceName}/plugintypes`,
    })
  }
}

const instance = new PluginTypeActions()
export default instance
