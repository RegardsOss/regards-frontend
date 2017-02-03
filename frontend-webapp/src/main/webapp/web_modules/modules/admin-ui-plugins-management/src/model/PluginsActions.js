/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 * @author Sébastien Binda
 */
class PluginsActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'ui-plugins-management/plugins',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-access/plugin`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN,
        ENTITY_ARRAY: Schemas.PLUGIN_ARRAY,
      },
    })
  }
}

const instance = new PluginsActions()
export default instance
