import Schemas from '@regardsoss/api'
import { BasicSignalActions } from '@regardsoss/store-utils'

class TestConnectionActions extends BasicSignalActions {
  constructor() {
    super({
      namespace: 'admin-data-connection-management/test-connection',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/connections/{connectionId}`,
      bypassErrorMiddleware: true
    })
  }
}

const instance = new TestConnectionActions()
export default instance
