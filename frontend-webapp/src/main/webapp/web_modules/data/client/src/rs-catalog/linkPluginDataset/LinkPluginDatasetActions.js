import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

export default class LinkPluginDatasetActions extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-catalog/linkplugindataset`,
      schemaTypes: {
        ENTITY: Schemas.LINK_PLUGIN_DATASET,
        ENTITY_ARRAY: Schemas.LINK_PLUGIN_DATASET_ARRAY,
      },
    })
  }
}
