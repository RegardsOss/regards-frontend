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
      namespace: 'admin-ui-layout-management/layout',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-access-instance/layouts`,
      entityPathVariable: 'applicationId',
      schemaTypes: {
        ENTITY: Schemas.LAYOUT,
        ENTITY_ARRAY: Schemas.LAYOUT_ARRAY,
      },
    })
  }
}

const instance = new LayoutInstanceActions()
export default instance
