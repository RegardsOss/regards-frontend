/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicArrayActions } from '@regardsoss/store-utils'

class EndpointActions extends BasicArrayActions {
// class EndpointActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'common/endpoint',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/resources`,
      schemaTypes: {
        ENTITY: Schemas.ENDPOINT,
        ENTITY_ARRAY: Schemas.ENDPOINT_ARRAY,
      },
    })
  }
}

const instance = new EndpointActions()
export default instance
