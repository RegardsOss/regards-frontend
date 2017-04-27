/**
 * LICENSE_PLACEHOLDER
 **/
import replace from 'lodash/replace'
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class PluginConfigurationActions extends BasicPageableActions {
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

  getMsDependency = (verb, microserviceName) => {
    let dependency = this.getDependency(verb)
    dependency = replace(dependency, '{microserviceName}', microserviceName)
    console.log('DEP', dependency)
    return dependency
  }
}

const instance = new PluginConfigurationActions()
export default instance
