import { BasicSignalActions } from '@regardsoss/store-utils'

class DatasourceLinkActions extends BasicSignalActions {
  constructor() {
    super({
      namespace: 'admin-data-datasource-management/datasource-link',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/datasources/{datasource_id}/{operation}`,
    })
  }
}

const instance = new DatasourceLinkActions()
export default instance
