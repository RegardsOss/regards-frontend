/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Layout entities
 */
class LayoutActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'user/layout',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/layouts`,
      schemaTypes: {
        ENTITY: Schemas.LAYOUT,
      },
    })
  }
}

const instance = new LayoutActions()
export default instance
