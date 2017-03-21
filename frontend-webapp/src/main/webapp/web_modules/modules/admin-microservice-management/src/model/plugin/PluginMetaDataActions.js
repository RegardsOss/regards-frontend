/**
 * LICENSE_PLACEHOLDER
 **/
import replace from 'lodash/replace'
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class PluginMetaDataActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-microservice-management/pluginMetaData',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microserviceName}/plugins`,
      schemaTypes: {
        ENTITY: Schemas.PLUGIN_META_DATA,
        ENTITY_ARRAY: Schemas.PLUGIN_META_DATA_ARRAY,
      },
    })
  }

  getMsDependency = (verb, microserviceName) => {
    let dependency = this.getDependency(verb)
    dependency = replace(dependency, '{microserviceName}', microserviceName)
    return dependency
  }
}

const instance = new PluginMetaDataActions()
export default instance
