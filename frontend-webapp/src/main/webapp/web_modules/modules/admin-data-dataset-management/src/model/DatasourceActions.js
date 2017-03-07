import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class DatasourceActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-data-dataset-management/datasource',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/datasources`,
      schemaTypes: {
        ENTITY: Schemas.DATASOURCE,
        ENTITY_ARRAY: Schemas.DATASOURCE_ARRAY,
      },
    })
  }
}

const instance = new DatasourceActions()
export default instance
