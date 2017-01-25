/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 */
class PluginsActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'ui-plugins-management/plugins',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-access/plugins`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN,
        ENTITY_ARRAY: Schemas.PLUGIN_ARRAY,
      },
    })
  }
}

const instance = new PluginsActions()
export default instance
