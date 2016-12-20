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
      namespace: 'ui-configuration/layout',
      entityEndpoint: 'http://localhost:3000/layout',
      // entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-access/layout`,
      schemaTypes: {
        ENTITY: Schemas.LAYOUT,
      },
    })
  }
}

const instance = new LayoutActions()
export default instance
