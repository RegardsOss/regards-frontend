/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

export default class DatasourceActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/datasources`,
      entityPathVariable: 'pPluginConfId',
      schemaTypes: {
        ENTITY: Schemas.DATASOURCE,
        ENTITY_ARRAY: Schemas.DATASOURCE_ARRAY,
      },
    })
  }
}
