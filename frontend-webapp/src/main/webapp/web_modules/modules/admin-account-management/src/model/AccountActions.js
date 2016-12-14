import Schemas from '@regardsoss/api'
import { BasicPaegableActions } from '@regardsoss/store-utils'

class AccountActions extends BasicPaegableActions {
  constructor() {
    super({
      namespace: 'admin-account-management',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/accounts`,
      schemaTypes: {
        ENTITY: Schemas.ACCOUNT,
        ENTITY_ARRAY: Schemas.ACCOUNT_ARRAY,
      },
    })
  }
}

const instance = new AccountActions()
export default instance
