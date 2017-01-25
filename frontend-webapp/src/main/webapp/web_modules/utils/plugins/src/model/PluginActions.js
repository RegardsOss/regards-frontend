/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 */
class CriterionActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'common/plugins',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-access/plugin%0`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN,
        ENTITY_ARRAY: Schemas.PLUGIN_ARRAY,
      },
    })
  }
}

const instance = new CriterionActions()
export default instance
