/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Layout entities
 * @author Sébastien binda
 */
class LayoutInstanceActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'ui-configuration/layout',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-access-instance/layouts`,
      schemaTypes: {
        ENTITY: Schemas.LAYOUT,
      },
    })
  }
}

const instance = new LayoutInstanceActions()
export default instance
