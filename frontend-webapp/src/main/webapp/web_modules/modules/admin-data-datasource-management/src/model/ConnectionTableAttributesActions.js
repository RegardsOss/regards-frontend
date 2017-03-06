/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

class ConnectionTableAttributesActions extends BasicSignalActions {
  constructor() {
    super({
      namespace: 'admin-data-datasource-management/connection-table-attributes',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/connections/{connectionId}/tables/{tableName}/columns`,
    })
  }
}

const instance = new ConnectionTableAttributesActions()
export default instance
