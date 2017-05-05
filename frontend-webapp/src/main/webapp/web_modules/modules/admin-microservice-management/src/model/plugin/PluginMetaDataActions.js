/**
 * LICENSE_PLACEHOLDER
 **/
import replace from 'lodash/replace'
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class PluginMetaDataActions extends BasicListActions {
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

  getMsDependency = (verb, microserviceName) => replace(this.getDependency(verb), '{microserviceName}', microserviceName)
}

const instance = new PluginMetaDataActions()
export default instance
