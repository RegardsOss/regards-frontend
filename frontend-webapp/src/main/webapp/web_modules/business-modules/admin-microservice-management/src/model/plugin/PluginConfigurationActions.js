/**
 * LICENSE_PLACEHOLDER
 **/
import replace from 'lodash/replace'
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class PluginConfigurationActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-microservice-management/pluginConfiguration',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microserviceName}/plugins/{pluginId}/config`,
      entityPathVariable: 'configId',
      schemaTypes: {
        ENTITY: Schemas.PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }

  getMsDependency = (verb, microserviceName) => replace(this.getDependency(verb), '{microserviceName}', microserviceName)
}

const instance = new PluginConfigurationActions()
export default instance
