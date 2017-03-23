/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class PluginConfigurationActions extends BasicPageableActions {
  constructor(type) {
    super({
      namespace: `admin-data-dataset-management/pluginConfiguration/${type}`,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/plugins/configs`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }
}

export const PluginConfigurationConvertersActions = new PluginConfigurationActions('converters')
export const PluginConfigurationServicesActions = new PluginConfigurationActions('services')
export const PluginConfigurationFiltersActions = new PluginConfigurationActions('filters')

