/**
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class AIPStatusConfiguration extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'archival-storage/aip-status',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-archival-storage/aip-status`, // TODO check me when back is ready!
      schemaTypes: {
        ENTITY: Schemas.AIP_STATUS,
        ENTITY_ARRAY: Schemas.AIP_STATUS_ARRAY,
      },
    })
  }
}

const instance = new AIPStatusConfiguration()
export default instance
