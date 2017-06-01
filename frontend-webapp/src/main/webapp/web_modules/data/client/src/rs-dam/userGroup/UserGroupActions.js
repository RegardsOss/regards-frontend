/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicSignalActions } from '@regardsoss/store-utils'

export default class UserGroupActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/accessgroups/{name}/{email}`,
      schemaTypes: {
        ENTITY: Schemas.ACCESS_GROUP,
        ENTITY_ARRAY: Schemas.ACCESS_GROUP_ARRAY,
      },
    })
  }
}

