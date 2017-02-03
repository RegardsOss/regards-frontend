/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 * @author Sébastien binda
 */
class CriterionActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'form/criterion',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-access/plugin?type=criterion`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN,
        ENTITY_ARRAY: Schemas.PLUGIN_ARRAY,
      },
    })
  }
}

const instance = new CriterionActions()
export default instance
