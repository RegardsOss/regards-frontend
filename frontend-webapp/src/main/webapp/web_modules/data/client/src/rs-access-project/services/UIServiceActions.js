/**
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Fetches UI services (ie: UI plugin configurations that have been indicated as results services)
 */
export default class UIServiceActions extends BasicListActions {

  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-access-project/services/{dataset_id}`,
      schemaTypes: {
        ENTITY: Schemas.UI_PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.UI_PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }

  fetchServices(datasetId) {
    if (datasetId) {
      return this.fetchEntityList({ dataset_id: datasetId })
    }
    return null
  }

}
