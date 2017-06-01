import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class LinkPluginDatasetActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-data-dataset-management/plugin-dataset',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/linkplugindataset`,
      schemaTypes: {
        ENTITY: Schemas.LINK_PLUGIN_DATASET,
        ENTITY_ARRAY: Schemas.LINK_PLUGIN_DATASET_ARRAY,
      },
    })
  }
}

const instance = new LinkPluginDatasetActions()
export default instance
