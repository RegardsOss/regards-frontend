import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

export class AccountActions extends BasicPageableActions {
  constructor(namespace = 'admin-account-management/accounts') {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/accounts`,
      schemaTypes: {
        ENTITY: Schemas.ACCOUNT,
        ENTITY_ARRAY: Schemas.ACCOUNT_ARRAY,
      },
    })
  }
}

const instance = new AccountActions()
export default instance
