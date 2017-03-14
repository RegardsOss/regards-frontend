/**
 * LICENSE_PLACEHOLDER
 **/
import { ROLE, ROLE_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class BorrowableRolesActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'menu/borrowable-roles',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/roles/borrowable`,
      schemaTypes: {
        ENTITY: ROLE,
        ENTITY_ARRAY: ROLE_ARRAY,
      },
    })
  }
}

export default new BorrowableRolesActions()
