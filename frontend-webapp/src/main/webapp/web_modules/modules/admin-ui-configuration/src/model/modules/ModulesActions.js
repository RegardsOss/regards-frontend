/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 */
class ModulesActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'ui-configuration/modules',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-access/applications/%0/modules`,
      schemaTypes: {
        ENTITY: Schemas.MODULE,
        ENTITY_ARRAY: Schemas.MODULE_ARRAY,
      },
    })
  }
}

const instance = new ModulesActions()
export default instance
