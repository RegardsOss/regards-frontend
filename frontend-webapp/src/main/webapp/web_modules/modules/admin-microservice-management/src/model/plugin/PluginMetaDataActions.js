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

  getDependency(verb, microserviceName) {
    let dependency = super.getDependency(verb)
    return replace(dependency,'{microserviceName',microserviceName)
  }
}

const instance = new PluginMetaDataActions()
export default instance
