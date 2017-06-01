/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Layout entities
 * @author Sébastien binda
 */
class LayoutActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-ui-layout-management/layout',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/layouts`,
      entityPathVariable: 'applicationId',
      schemaTypes: {
        ENTITY: Schemas.LAYOUT,
        ENTITY_ARRAY: Schemas.LAYOUT_ARRAY,
      },
    })
  }
}

const instance = new LayoutActions()
export default instance
