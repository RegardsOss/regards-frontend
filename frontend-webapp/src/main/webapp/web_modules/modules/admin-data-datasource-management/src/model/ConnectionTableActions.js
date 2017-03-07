/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

class ConnectionTableActions extends BasicSignalActions {
  constructor() {
    super({
      namespace: 'admin-data-datasource-management/connection-table',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/connections/{connectionId}/tables`,
    })
  }
}

const instance = new ConnectionTableActions()
export default instance
