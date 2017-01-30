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
      namespace: 'user/layout/modules',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-access/applications/{applicationId}/modules`,
      schemaTypes: {
        ENTITY: Schemas.MODULE,
        ENTITY_ARRAY: Schemas.MODULE_ARRAY,
      },
    })
  }
}

const instance = new ModulesActions()
export default instance
