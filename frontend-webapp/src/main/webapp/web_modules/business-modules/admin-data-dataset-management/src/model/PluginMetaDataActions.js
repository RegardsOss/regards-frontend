/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class PluginMetaDataActions extends BasicPageableActions {
  constructor(type) {
    super({
      namespace: `admin-data-dataset-management/pluginMetaData/${type}`,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-catalog/plugins`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN_META_DATA,
        ENTITY_ARRAY: Schemas.PLUGIN_META_DATA_ARRAY,
      },
    })
  }
}

export const PluginMetaDataConvertersActions = new PluginMetaDataActions('converters')
export const PluginMetaDataServicesActions = new PluginMetaDataActions('services')
export const PluginMetaDataFiltersActions = new PluginMetaDataActions('filters')
