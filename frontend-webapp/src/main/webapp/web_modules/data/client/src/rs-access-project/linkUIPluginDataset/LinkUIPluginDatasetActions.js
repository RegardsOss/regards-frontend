import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

export default class LinkUIPluginDatasetActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/linkplugindataset`,
      schemaTypes: {
        ENTITY: Schemas.LINK_UI_PLUGIN_DATASET,
        ENTITY_ARRAY: Schemas.LINK_UI_PLUGIN_DATASET_ARRAY,
      },
    })
  }
}
