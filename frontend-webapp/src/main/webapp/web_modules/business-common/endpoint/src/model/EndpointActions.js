/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class EndpointActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'common/endpoint',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/resources`,
      schemaTypes: {
        ENTITY: Schemas.RESOURCE_ACCESS,
        ENTITY_ARRAY: Schemas.RESOURCE_ACCESS_ARRAY,
      },
    })
  }
}

const instance = new EndpointActions()
export default instance
