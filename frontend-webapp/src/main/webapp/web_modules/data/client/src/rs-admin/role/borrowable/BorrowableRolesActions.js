/**
 * LICENSE_PLACEHOLDER
 **/
import { ROLE, ROLE_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Actions to fetch borrowable roles list for an authenticated user
 */
export default class BorrowableRolesActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/roles/borrowables`,
      schemaTypes: {
        ENTITY: ROLE,
        ENTITY_ARRAY: ROLE_ARRAY,
      },
    })
  }
}
